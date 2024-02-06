import React, { useEffect, useState } from "react";
import { useFetch } from "../Hooks/useFetch.hook";
import { setProject, unSetProject } from "../redux/reducers/projectRedux";
import {
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Slide,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { red } from "@mui/material/colors";
import { deleteProject, exportProject } from "../redux/ProjectApiCalls";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import "../Styles/projectCollection.css";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ProjectList() {
    const [open, setOpen] = useState(false);
    const [clientDownloadFlag, setClientDownloadFlag] = useState(true);
    const [serverDownloadFlag, setServerDownloadFlag] = useState(true);
    const [openDownloadPopup, setOpenDownloadPopup] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [deleted, setDeleted] = useState("");
    const { project } = useSelector((state) => state.project);
    const { currentUser } = useSelector((state) => state.user);
    const [activeProject, setActiveProject] = useState(project);
    const dispatch = useDispatch();

    const { response, loading, error, fetchData } = useFetch(
        'user',
        `/project/get/all`,
        "get"
    );

    const handleClickOpen = (id, projectName) => {
        setSelectedIndex(id);
        setSelectedProject(projectName);
        setOpen(true);
    };

    const handleClickOpenDownloadPopup = (projectName) => {
        setSelectedProject(projectName);
        setOpenDownloadPopup(true);
    };

    const handleClose = () => {
        setSelectedIndex(null);
        setSelectedProject(null);
        setOpen(false);
    };

    const handleDownloadPopupClose = () => {
        setSelectedIndex(null);
        setSelectedProject(null);
        setOpenDownloadPopup(false);
    };

    const activateProject = (projectName) => {
        dispatch(setProject({ project: projectName }));
        toast.success(`${projectName} activated.`);
    };

    const deactivateProject = (projectName) => {
        dispatch(unSetProject());
        toast.success(` ${projectName} is deactivated and Default demo project is activated.`);
    };

    useEffect(() => {
        setActiveProject(project);
    }, [project]);

    const handleDelete = (id) => {
        handleClose();
        let monogo_id = id;
        if (monogo_id) {
            let res = deleteProject(monogo_id);
            res.then(() => {
                setDeleted(monogo_id);
            });
        } else {
            toast.success("Error while getting Project ID.");
        }
    };

    const downloadProject = (projectName, client = true, server = true) => {
        if (projectName) {
            if (client || server) {
                handleDownloadPopupClose();
                exportProject(projectName, client, server);
            } else {
                toast.error('You need to must select one of the checkbox (client or server)');
            }
        } else {
            toast.error('Unable to find project name')
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "client") {
            setClientDownloadFlag(e.target.checked)

        }
        if (e.target.name === "server") {
            setServerDownloadFlag(e.target.checked);
        }

    };

    useEffect(() => {
        if (deleted) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [deleted]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [currentUser]);

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
    return response.length ? (
        <>
            <div className="overflow-auto">
                <div className="collection-table collection-table-wraper">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Project Name</th>
                                <th>Actions</th>
                                <th>Export</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {response.map((data, index) => (
                                <tr key={data._id} className={activeProject === data.name ? "active-project-list" : "not-active-project-list"} >
                                    <td>{index + 1}</td>
                                    <td>{data.name}</td>
                                    <td>
                                        <button
                                            onClick={() => activeProject === data.name ? deactivateProject(data.name) : activateProject(data.name)}
                                            title="View Collection Detail"
                                            className={activeProject === data.name ? "active-project" : "not-active-project"}>
                                            {activeProject === data.name ? "Deactivate" : "Active"}
                                        </button>
                                    </td>
                                    <td>
                                        <span
                                            onClick={() => handleClickOpenDownloadPopup(data.name)}
                                            className="bg-white rounded-full shadow-lg p-[0.35rem] m-1 cursor-pointer"
                                            title="Download Project"
                                        >
                                            <SaveAltIcon sx={{ fontSize: 23 }} />
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            data-id={data._id}
                                            onClick={() => handleClickOpen(data._id, data.name)}
                                            className="bg-white rounded-full shadow-lg p-[0.35rem] m-1 cursor-pointer">
                                            <DeleteOutlineOutlinedIcon sx={{ color: red["A700"] }} />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle>Delete project named {selectedProject}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure to delete {selectedProject} project permanatily? Keep
                            in mind All collection and apis and media will be deleted related to
                            that project.
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
                <Dialog
                    open={openDownloadPopup}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleDownloadPopupClose}
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle>Download project: {selectedProject}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Please checked the option whoch you want to download. If you want to download both frontend and backend then checked both options.
                        </DialogContentText>
                        <FormGroup>
                            <FormControlLabel name="client" control={<Checkbox defaultChecked={clientDownloadFlag} onChange={(e) => handleChange(e)} />} label="Client (frontend)" />
                            <FormControlLabel name="server" control={<Checkbox defaultChecked={serverDownloadFlag} onChange={(e) => handleChange(e)} />} label="Server (backend)" />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleDownloadPopupClose}
                            style={{
                                borderRadius: 0,
                            }}
                        >
                            Cancle
                        </Button>
                        <Button variant="outlined"
                            disabled={clientDownloadFlag || serverDownloadFlag ? false : true}
                            onClick={() => downloadProject(selectedProject, clientDownloadFlag, serverDownloadFlag)}
                            color="success"
                            style={{
                                borderRadius: 0,
                            }}>
                            Download
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    ) : (
        <div className="h-[84vh]">
            <p className="ml-error h-[84vh] flex justify-center items-center">
                <i>You have no Project</i> {".·´¯`(>▂<)´¯`·."}
            </p>
        </div>
    );
}

export default ProjectList;
