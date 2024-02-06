import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import { useFetch } from "../Hooks/useFetch.hook";
import { validateAndGetJson } from "../helper/ProjectHelper";
import { update } from "../redux/ProjectApiCalls";
import ProjectConfigHeading from "./ProjectConfigHeading";
import { toast } from "react-hot-toast";

function ProjectConfigs() {
    const { project } = useSelector((state) => state.project);
    const [projectId, setProjectId] = useState(null);

    const { response, loading, error } = useFetch('user', `/project/configs`, "get", {
        name: project,
    });

    const navigate = useNavigate();

    const schemaAttributeTemplate = { key: "", value: "" };
    const [schemaAttributes, setSchemaAttributes] = useState([schemaAttributeTemplate]);

    const addMoreAttribute = () =>
        setSchemaAttributes([...schemaAttributes, schemaAttributeTemplate]);

    const handleChange = (e, index) => {
        const updatedSchemaAttributes = schemaAttributes.map((attribute, i) => {
            if (index === i) {
                let name = e.target.name;
                let value =
                    name === "key"
                        ? e.target.value.replace(/\s+/g, "").toUpperCase()
                        : e.target.value;

                    if (['MONGO_ATLAS_URI', 'JWT_SECRET', 'PORT'].includes(value)) {
                        toast.error(`${value} is reserved for project, which you can set in .env file after export`)
                        return Object.assign({ ...attribute });
                    }
                return Object.assign({ ...attribute }, { [name]: value });
            }
            return attribute;
        });
        setSchemaAttributes(updatedSchemaAttributes);
    };

    const removeAttribute = (index) => {
        const fillteredAttributes = [...schemaAttributes];
        fillteredAttributes.splice(index, 1);
        setSchemaAttributes(fillteredAttributes);
    };
    useEffect(() => {
        if (response?.configs?.length) {
            let newArr = response?.configs.map(({ _id, ...rest }) => rest);
            setSchemaAttributes(newArr);
        }
        setProjectId(response?._id);
    }, [response]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (schemaAttributes?.length) {
            const projectConfigsStrings = validateAndGetJson(schemaAttributes);
            if (projectConfigsStrings) {
                const body = {
                    id: projectId,
                    project,
                    projectConfigsStrings,
                };
                const res = await update(body);
                if (res?.status === 201) navigate(0);
            }
        } else {
            const body = {
                id: projectId,
                project,
                projectConfigsStrings: null,
            };
            const res = await update(body);
            if (res?.status === 201) navigate(0);
        }
    };

    if (loading)
        return (
            <>
                <ProjectConfigHeading project={project} />
                <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
                    <CircularProgress />
                </h1>
            </>
        );
    if (error)
        return (
            <>
                <ProjectConfigHeading project={project} />
                <h1 className="flex min-h-[60vh] justify-center items-center text-xl text-red-500">
                    {error}
                </h1>
            </>
        );
    return (
        <>
            <ProjectConfigHeading project={project} />
            {response ? (
                <div className='api-form-wrapper'>
                    <form className="project-form sm:min-w-[0] min-w-[600px]" onSubmit={(e) => e.preventDefault()}>
                        <>
                            <div className="c-project">
                                <h3>ENV Configs</h3>
                                <div>
                                    {schemaAttributes.map((attribute, index) => (
                                        <div key={index} className="c-att">
                                            <span>{index + 1}</span>
                                            <TextField
                                                id="key"
                                                name="key"
                                                label="Key"
                                                variant="outlined"
                                                sx={{ width: 500 }}
                                                value={attribute.key}
                                                required
                                                onChange={(e) => handleChange(e, index)}
                                            />
                                            <TextField
                                                id="value"
                                                name="value"
                                                label="Value"
                                                variant="outlined"
                                                sx={{ width: 500 }}
                                                value={attribute.value}
                                                required
                                                onChange={(e) => handleChange(e, index)}
                                            />
                                            <span className="bg-white rounded-full shadow-lg p-2 cursor-pointer">
                                                <DeleteOutlineOutlinedIcon
                                                    sx={{ color: red["A700"] }}
                                                    onClick={() => removeAttribute(index)}
                                                />
                                            </span>
                                        </div>
                                    ))}
                                    <div className="m-att">
                                        <span onClick={() => addMoreAttribute()}>
                                            <QueueOutlinedIcon /> Add More Configs
                                        </span>
                                    </div>
                                </div>
                                <div className="buttons env-btns">
                                    <Button
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#1f2937"
                                        }}
                                        type="submit"
                                        onClick={(e) => handleUpdate(e)}
                                        disabled={projectId ? false : true}
                                        variant="contained">
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </>
                    </form>
                </div>
            ) : null}
        </>
    );
}

export default ProjectConfigs;
