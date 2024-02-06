import React from "react";
import { useEffect, useState } from "react";
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
import { deletePage } from "../redux/PageApiCalls";
import { Link, useNavigate } from "react-router-dom";
import PageListHeading from "./PageListHeading";
import "../Styles/projectCollection.css";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PageList() {
    const { project } = useSelector((state) => state.project);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedPage, setSelectedPage] = useState(null);
    const navigate = useNavigate();
    const { response, loading, error, fetchData } = useFetch(
        'user',
        `/pages/allPages`,
        "get",
        {
            project,
        }
    );
    const [deleted, setDeleted] = useState("");

    const handleClickOpen = (id, pageName) => {
        setSelectedIndex(id);
        setSelectedPage(pageName);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedIndex(null);
        setSelectedPage(null);
        setOpen(false);
    };

    const handleEdit = (pageId) => {
        navigate(`/frontend/page/edit/${pageId}`);
    };

    const handleDelete = (id) => {
        handleClose();
        let monogo_id = id;
        if (monogo_id) {
            let res = deletePage(monogo_id);
            res.then(() => {
                setDeleted(monogo_id);
            });
        } else {
            toast.success("Error while getting Page ID.");
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
                <PageListHeading project={project} />
                <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
                    <CircularProgress />
                </h1>
            </>
        );
    if (error)
        return (
            <>
                <PageListHeading project={project} />
                <h1 className="flex min-h-[60vh] justify-center items-center text-xl text-red-500">
                    {error}
                </h1>
            </>
        );
    return response.length ? (
        <>
            <PageListHeading project={project} />
            <div className='api-form-wrapper'>
                <div className="collection-table sm:min-w-[0] min-w-[500px]">
                    <div className="collec-list">
                        <ul>
                            {response.map((data, index) => (
                                <li key={data._id}>
                                    <div>
                                        <span>{index + 1}</span>
                                        <div>{data.pageName}</div>
                                    </div>
                                    <div>
                                        <div>{data.url}</div>
                                    </div>
                                    <div>
                                        <Link
                                            to={`/frontend/page/preview/${data._id}`}
                                            title="Page Preview"
                                            target="_blank"
                                            className=" text-sm text-gray-500 cursor-pointer underline">
                                            Preview
                                        </Link>
                                        <span
                                            onClick={() => handleEdit(data._id)}
                                            title="Page Preview"
                                            target="_blank"
                                            className=" text-sm text-gray-500 cursor-pointer underline">
                                            Edit Page
                                        </span>
                                        <span
                                            data-id={data._id}
                                            onClick={() =>
                                                handleClickOpen(data._id, data.pageName)
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
                            <DialogTitle>Delete Page named {selectedPage}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Are you sure to delete {selectedPage} Page permanatily?
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
            <PageListHeading project={project} />
            <p className="ml-error h-[84vh] flex justify-center items-center">
                <i>You have no page yet</i> {".·´¯`(>▂<)´¯`·."}
            </p>
        </div>
    );
}

export default PageList;
