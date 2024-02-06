import React, { useState } from "react";
import { Button, Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { collectionAttributesTypes, validateAndGetJson } from "../helper/collectionHelper";
import { toast } from "react-hot-toast";
import { red } from "@mui/material/colors";
import { checkCollectionAlreadyExist, create } from "../redux/CollectionApiCalls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';

function CollectionDynamicForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [collectionName, setCollectionName] = useState(null);
    const [collectionNameError, setCollectionNameError] = useState(false);
    const [collectionNameErrorMessage, setCollectionNameErrorMessage] = useState("");

    const { project, database } = useSelector((state) => state.project);

    const navigate = useNavigate();

    const schemaAttributeTemplate = {
        name: "",
        type: "",
        unique: false,
        required: false,
    };

    const [schemaAttributes, setSchemaAttributes] = useState([schemaAttributeTemplate]);

    const addMoreAttribute = () =>
        setSchemaAttributes([...schemaAttributes, schemaAttributeTemplate]);

    const handleChange = (e, index) => {
        const updatedSchemaAttributes = schemaAttributes.map((attribute, i) =>
            index === i
                ? e.target.name === "unique" || e.target.name === "required"
                    ? Object.assign({ ...attribute }, { [e.target.name]: e.target.checked })
                    : Object.assign({ ...attribute }, { [e.target.name]: e.target.value.replace(/\s+/g, '') })
                : attribute
        );
        setSchemaAttributes(updatedSchemaAttributes);
    };

    const removeAttribute = (index) => {
        const fillteredAttributes = [...schemaAttributes];
        fillteredAttributes.splice(index, 1);
        setSchemaAttributes(fillteredAttributes);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (schemaAttributes.length ) {
            const schemaJson = validateAndGetJson(schemaAttributes);
            if (schemaJson) {
                    const collectionJsonString = JSON.stringify(schemaJson);
                    const body = {
                        project,
                        database,
                        collectionName,
                        collectionJsonString,
                    };
                    const res = await create(body);
                    if (res?.status === 201) navigate("/backend/collections") 
            }
        } else {
            toast.error("Must Enter atleast one attribute. click on plus (+) icon");
        }
    };

    const handleNextCollectionStep = async () => {
        if (!collectionNameError && collectionName) {
            let isExist = await checkCollectionAlreadyExist({project, collectionName });
            if (!isExist) setCurrentStep(currentStep + 1);
        } else {
            toast.error("Please enter a valid unique collection name");
        }
    };

    const handleCollectionNameChange = (e) => {
        let value = e.target.value.trim(); // Remove leading/trailing spaces
        const regex = /^[a-zA-Z]+$/; // Only allow letters

        if (value === "" || regex.test(value)) {
            // If input is empty or only contains letters
            value = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
            setCollectionName(value);
            setCollectionNameErrorMessage("");
            setCollectionNameError(false); // Update state
        } else {
            setCollectionNameError(true);
            setCollectionNameErrorMessage("Collection name Must contain only alphabets");
            setCollectionName(value);
        }
    };

    const handleBackStep = () => {
        setCurrentStep(currentStep -1);
    }

    return (
        <>
            <div className='api-form-wrapper'>        
                <form className="collection-form min-w-[600px]" onSubmit={(e) => e.preventDefault() }>
                    {currentStep === 1 && (
                        <div className="c-collection">
                            <h3>Create Collection</h3>
                            <div className="text-field-box">
                                <TextField
                                    className="text-field"
                                    id="collectionName"
                                    name="collectionName"
                                    label="Collection Name"
                                    variant="outlined"
                                    error={collectionNameError}
                                    helperText={collectionNameErrorMessage}
                                    value={collectionName ?? ""}
                                    required
                                    onChange={(e) => handleCollectionNameChange(e)}
                                />
                            </div>
                            <div className="btns">
                                <Button variant="contained" onClick={() => handleNextCollectionStep()}
                                style={{
                                    borderRadius: 0,
                                    backgroundColor: "#1f2937"
                                }}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <>
                            <div className="c-collection">
                            <h3>Collection Attributes</h3>
                                <div>
                                    {schemaAttributes.map((attribute, index) => (
                                        <div key={index} className="c-att">
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="Name"
                                                variant="outlined"
                                                sx={{ width: 340 }}
                                                value={attribute.name}
                                                required
                                                onChange={(e) => handleChange(e, index)}
                                            />

                                            <TextField
                                                id="type"
                                                value={attribute.type}
                                                sx={{ width: 340 }}
                                                label="Type"
                                                name="type"
                                                required
                                                select
                                                onChange={(e) => handleChange(e, index)}>
                                                <MenuItem disabled value={""}>
                                                    {""}
                                                </MenuItem>
                                                {collectionAttributesTypes.map((option) => (
                                                    <MenuItem key={option.label} value={option.value}>
                                                        {option.value}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                checked={attribute.unique}
                                                label="Unique"
                                                name="unique"
                                                onChange={(e) => handleChange(e, index)}
                                            />
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                checked={attribute.required}
                                                label="Required"
                                                name="required"
                                                onChange={(e) => handleChange(e, index)}
                                            />
                                            <span className="bg-white rounded-full shadow-lg p-2">
                                                <DeleteOutlineOutlinedIcon
                                                    sx={{ color: red["A700"] }}
                                                    onClick={() => removeAttribute(index)}
                                                />
                                            </span>
                                        </div>
                                    ))}
                                    <div  className="m-att">
                                        <span onClick={() => addMoreAttribute()}>
                                            <QueueOutlinedIcon />{" "}
                                            Add More Attributes
                                        </span>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <Button variant="contained" color="success"
                                     onClick={handleBackStep} className="z-[99]" style={{borderRadius : 0}}>Back</Button>
                                    <Button type="submit" onClick={(e) => handleCreate(e)} variant="contained" 
                                    style={{
                                        borderRadius: 0,
                                        backgroundColor: "#1f2937"
                                    }}
                                    >
                                        Create Collection
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </>
    );
}

export default CollectionDynamicForm;
