import React, { useEffect, useState } from "react";
import { useFetch } from "../Hooks/useFetch.hook";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from "@mui/material";
import { toast } from "react-hot-toast";
import "../Styles/collectionDetails.css";
import { deleteCollection } from "../redux/CollectionApiCalls";
import { useNavigate, useParams } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CollectionDetails() {
    const { collectionId } = useParams();
    const [open, setOpen] = useState(false);
    const [collectionData, setCollectionData] = useState([]);
    const [collectionName, setCollectionName] = useState(null);
    const [rowKeys, setRowKeys] = useState(null);
    const { response, loading, error } = useFetch(
        'user',
        `/collection/get/${collectionId}`,
        "get"
    );

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if (collectionId) {
            let res = deleteCollection(collectionId);
            res.then(() => {
                navigate("/backend/collections");
                toast.success("Collection Deleted");
            });
        } else {
            toast.success("Error while getting Collection ID.");
        }
    };

    useEffect(() => {
        if (response) {
            setCollectionName(response?.collectionName);
            let colData = response?.collectionJsonString;
            if (colData) {
                setCollectionData(JSON.parse(colData));
                setRowKeys(Object.keys(collectionData));
            }
        }
        // eslint-disable-next-line
    }, [response]);

    const tableRows = rowKeys
        ? rowKeys.map((key, index) => {
            return (
                <tr key={index}>
                    <td>{key}</td>
                    <td>{collectionData[key].type}</td>
                    <td>{collectionData[key].unique ? "Yes" : "No"}</td>
                    <td>{collectionData[key].required ? "Yes" : "No"}</td>
                </tr>
            );
        })
        : null;

    if (loading)
        return (
            <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
                <CircularProgress />
            </h1>
        );
    if (error)
        return (
            <h1 className="flex min-h-[60vh] justify-center items-center text-xl text-red-500">
                {error}
            </h1>
        );
    return response ? (
        <>
            <div className="page-header-block">
                <h3 className="page-heading">{collectionName}</h3>
                <div className="header-content">
                    <Button variant="contained" onClick={() => navigate("/backend/collection/new")} 
                    style={{
                        borderRadius: 0,
                        backgroundColor: "#1f2937",
                    }}
                    >
                        Create New Collection
                    </Button>
                    <Button variant="contained" color="error" onClick={handleClickOpen}
                    style={{
                        borderRadius: 0,
                    }}
                    >
                        Delete Collcetion
                    </Button>
                </div>
            </div>
            <div className="overflow-auto">
            <div className="collection-table collection-table-wraper">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Unique</th>
                            <th>Required</th>
                        </tr>
                    </thead>
                    <tbody>{collectionData ? tableRows : null}</tbody>
                </table>
            </div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>Delete collection</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to delete collection permanatily?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                    <Button onClick={handleClose}
                    variant="contained"
                    style={{
                        borderRadius: 0,
                        backgroundColor: "#1f2937"
                    }}
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    ) : (
        <div className="h-[84vh]">
            <p className="ml-error h-[84vh] flex justify-center items-center">
                <i>User have no Collection</i> {".·´¯`(>▂<)´¯`·."}
            </p>
        </div>
    );
}

export default CollectionDetails;
