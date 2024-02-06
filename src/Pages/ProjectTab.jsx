import React, { useState } from "react";
import ProjectList from "../Components/ProjectList";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { create, isProjectExist } from "../redux/ProjectApiCalls";
import Notes from "../Components/Notes";

function ProjectTab() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (name) {
            const isExist = await isProjectExist(name);
            if (!isExist) {
                try {
                    const res = await create(name);
                    if (res?.status === 201) {
                        setOpen(false);
                        navigate(0);
                    }
                } catch (error) {
                    setError(true);
                    setErrorMessage(error.message);
                }
            } else {
                setError(true);
                setErrorMessage("Project With same name already exist.");
            }
        } else {
            setError(true);
            setErrorMessage("Project Name should not be empty.");
        }
    };

    const handleChange = async (e) => {
        let value = e.target.value.trim().replace(/\s+/g, ""); // Remove leading/trailing spaces and spaces between words;
        setError(false);
        setErrorMessage("");
        setName(value);
    };



    return (
        <>
            <div className="page-header-block">
                <h1 className="page-heading">Projects</h1>
                <Button variant="contained" onClick={handleClickOpen}
                style={{
                    borderRadius: 0,
                    backgroundColor: "#1f2937"
                }}
                >
                    Create New Project
                </Button>
            </div>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Project</DialogTitle>
                <DialogContent>
                    <DialogContentText className="m-4">
                        Please enter the project name. Spaces are ont allowed. i.e shopping-cart
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={name}
                        error={error}
                        helperText={errorMessage}
                        onChange={(e) => handleChange(e)}
                        margin="dense"
                        id="name"
                        label="Project Name"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} style={{borderRadius: 0,backgroundColor: "#1f2937"}}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreate} style={{borderRadius: 0,backgroundColor: "#1f2937"}}>Create</Button>
                </DialogActions>
            </Dialog>
            <ProjectList />
            <Notes
                noteData={{
                    info: ['BY default Demo project is ACTIVE'],
                    // warning: ['warning messsage here'],
                    // critical: ["critical message here"]
                }}
            />
        </>
    );
}

export default ProjectTab;
