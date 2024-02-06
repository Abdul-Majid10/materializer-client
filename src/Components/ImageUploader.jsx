import React, { useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Button } from "@mui/material";
import { upload } from "../redux/MediaApiCalls";
import { useNavigate } from "react-router-dom";
import "../Styles/uploader.css";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

function ImageUploader(props) {
    const [files, setFiles] = useState([]);
    const [enableBtn, setEnableBtn] = useState(false);
    const { project } = useSelector((state) => state.project);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFiles(e.target.files);
    };
    const hanbleDragOver = (e) => {
        e.preventDefault();
        if (e.target.classList.contains("dropzone")) {
            e.target.classList.add("dragover");
        }
    };
    const hanbleDragLeave = (e) => {
        e.preventDefault();
        if (e.target.classList.contains("dropzone")) {
            e.target.classList.remove("dragover");
        }
    };
    const hanbleDrop = (e) => {
        e.preventDefault();
        if (checkDropFileTypes(e)) {
            setFiles(e.dataTransfer.files);
            if (e.target.classList.contains("dropzone")) {
                e.target.classList.remove("dragover");
            }
        } else {
            toast.error("Please Drop Only Image Files.");
        }
    };

    function checkDropFileTypes(e) {
        const files = e.dataTransfer.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileType = file.type.split("/")[0];
            if (fileType !== "image") {
                return false;
            }
        }
        return true;
    }

    const uploadHandler = (e) => {
        e.preventDefault();

        if (files.length) {
            let formData = new FormData();
            for (let file in files) {
                formData.append(file, files[file]);
            }
            formData.append("project", project);
            setEnableBtn(true);
            upload(formData)
                .then((res) => {
                    setEnableBtn(false);
                    navigate("/media");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            <div className="page-header-block">
                <h1 className="page-heading">Images Uploader</h1>
            </div>
            <form
                onDragOver={hanbleDragOver}
                onDrop={hanbleDrop}
                onDragLeave={hanbleDragLeave}
                className="mid:p-[150px] p-[50px] lg:mx-20 mx-[30px] my-8 border-dashed border-[2px] dropzone text-center"
                onClick={() => document.getElementById("image-uploader-input").click()}>
                <input
                    type="file"
                    accept="image/*"
                    name="image-uploader-input"
                    id="image-uploader-input"
                    multiple
                    hidden
                    onChange={changeHandler}
                />
                <CloudUploadOutlinedIcon fontSize="large" className="cursor-pointer"/>
                <div>
                    {files.length ? (
                        <div className="select-fils">
                            <span>{files.length} files are selected.</span>
                            <span> Click on Upload button to upload Images</span>
                        </div>
                    ) : (
                        "Click here or Drag and Drop images here to upload images"
                    )}
                </div>
            </form>
            <div className="text-center mb-10">
                {files.length ? (
                    <Button
                        style={{
                            borderRadius: 0,
                            color: '#FFFFFF',
                            backgroundColor: "#1f2937"
                        }}
                        variant="contained"
                        className="center"
                        disabled={enableBtn}
                        onClick={uploadHandler}>
                        Upload Images
                    </Button>
                ) : null}
            </div>
            <div className="mb-20">
                <div>
                    {files.length ? (
                        <>
                            <h2 className="select-img-h"> Selected Images </h2>
                            <ul className="img-list">
                                {Array.from(files).map((file, i) => {
                                    return (
                                        <li key={i}>
                                            <span>{i + 1}</span>
                                            <span>{file.name}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default ImageUploader;
