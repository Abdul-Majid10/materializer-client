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
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "../Styles/projectCollection.css";
import { deleteCollection } from "../redux/CollectionApiCalls";
import { useNavigate } from "react-router-dom";
import CollectionListHeading from "./CollectionListHeading";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CollectionList() {
    const { project } = useSelector((state) => state.project);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const navigate = useNavigate();
    const { response, loading, error, fetchData } = useFetch(
        'user',
        `/collection/getProjectCollection`,
        "get",
        {
            project,
        }
    );
    const [deleted, setDeleted] = useState("");

    const handleClickOpen = (id, collectionName) => {
        setSelectedIndex(id);
        setSelectedCollection(collectionName);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedIndex(null);
        setSelectedCollection(null);
        setOpen(false);
    };

    const viewDetail = (collectionId) => {
        navigate(`/backend/collection/${collectionId}`);
    };

    const handleDelete = (id) => {
        handleClose();
        let monogo_id = id;
        if (monogo_id) {
            let res = deleteCollection(monogo_id);
            res.then(() => {
                setDeleted(monogo_id);
            });
        } else {
            toast.success("Error while getting Collection ID.");
        }
    };

    useEffect(() => {
        if (deleted) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [deleted]);

    if (loading)
        return (
            <>
                <CollectionListHeading project={project} />
                <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
                    <CircularProgress />
                </h1>
            </>
        );
    if (error)
        return (
            <>
                <CollectionListHeading project={project} />
                <h1 className="flex min-h-[60vh] justify-center items-center text-xl text-red-500">
                    {error}
                </h1>
            </>
        );
    return response.length ? (
        <>
            <CollectionListHeading project={project} />
            <div className='api-form-wrapper'>
                <div className="collection-table sm:min-w-[0] min-w-[500px]">
                    <div className="collec-list">
                        <ul>
                            {response.map((data, index) => (
                                <li key={data._id}>
                                    <div>
                                        <span>{index + 1}</span>
                                        <div>{data.collectionName}</div>
                                    </div>
                                    <div>
                                        <span
                                            onClick={() => viewDetail(data._id)}
                                            title="View Collection Detail"
                                            className=" text-sm text-gray-500 cursor-pointer underline">
                                            View Detail
                                        </span>
                                        <span
                                            data-id={data._id}
                                            onClick={() =>
                                                handleClickOpen(data._id, data.collectionName)
                                            }
                                            className="bg-white rounded-full shadow-lg p-1 m-1">
                                            <DeleteOutlineOutlinedIcon sx={{ color: red["A700"] }} />
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description">
                            <DialogTitle>Delete collection named {selectedCollection}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Are you sure to delete {selectedCollection} collection permanatily?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleDelete(selectedIndex)} color="error">
                                    Delete
                                </Button>
                                <Button variant="contained" onClick={handleClose}
                                style={{
                                    borderRadius: 0,
                                    backgroundColor: "#1f2937"
                                }}
                                >
                                    Cancle
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <div className="h-[84vh]">
            <CollectionListHeading project={project} />
            <p className="ml-error h-[84vh] flex justify-center items-center">
                <i>You have no Collection</i> {".·´¯`(>▂<)´¯`·."}
            </p>
        </div>
    );
}

export default CollectionList;
