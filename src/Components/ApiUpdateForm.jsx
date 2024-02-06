import React, { useEffect, useState } from "react";
import { useFetch } from "../Hooks/useFetch.hook";
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    MenuItem,
    TextField,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-hot-toast";
import { methods, types } from "../helper/apiHelper";
import { update } from "../redux/ApisServerCalls";

function ApiUpdateForm(props) {
    const [apiId, setApiId] = useState(props.apiId);
    const [resData, setResData] = useState({});

    const { response, loading, error, fetchData } = useFetch(
        'user',
        `/backendApis/get/${apiId}`,
        "get"
    );

    useEffect(() => {
        setApiId(props.apiId);
    }, [props.apiId]);

    useEffect(() => {
        setResData(Object.assign({}, response));
    }, [response]);

    const handleChange = (e) => {
        if (e.target.name === "exportIncluded") {
            setResData(
                Object.assign({}, resData, {
                    [e.target.name]: e.target.checked,
                })
            );
        } else {
            setResData(
                Object.assign({}, resData, {
                    [e.target.name]: e.target.value.replace(/\s+/g, ""),
                })
            );
        }
    };

    const handleCopy = (e) => {
        navigator.clipboard.writeText(e.currentTarget.dataset.full_url);
        toast.success("copied: " + e.currentTarget.dataset.full_url);
    };

    const submitRequest = (_id) => {
        let res = update(_id, resData);
        res.then((data) => {
            fetchData();
        });
    }

    const handleSubmit = (_id) => {
        let colName = props?.collectionName;
        if ([`Get${colName}`, `Delete${colName}`, `Update${colName}`].includes(resData.name)){
            if (!resData.apiEndUrl.endsWith("/:id")){
                toast.error("End URL must ends with /:id.")
            }else{
                submitRequest(_id);
            }
        }else{
            submitRequest(_id);
        }
    };

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
    return (
        <>
            {resData ? (
                <form
                    className="api-routes-form"
                    key={resData._id}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        variant="standard"
                        value={resData?.name}
                        required
                        disabled
                    />
                    <TextField
                        id="apiBaseUrl"
                        name="apiBaseUrl"
                        label="Base URL"
                        variant="standard"
                        value={resData?.apiBaseUrl}
                        required
                        disabled
                    />
                    <TextField
                        id="apiEndUrl"
                        name="apiEndUrl"
                        label="End URL"
                        variant="standard"
                        value={resData?.apiEndUrl}
                        required
                        onChange={(e) => handleChange(e)}
                    />
                    <div className="w-[100px]">
                        <TextField
                            id="apiMethod"
                            name="apiMethod"
                            label="Method"
                            variant="standard"
                            fullWidth
                            value={resData?.apiMethod}
                            required
                            select
                            onChange={(e) => handleChange(e)} //drop down ]
                        >
                            {methods.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="w-[90px]">
                        <TextField
                            id="type"
                            name="type"
                            label="Type"
                            variant="standard"
                            fullWidth
                            value={resData?.type}
                            required
                            select
                            onChange={(e) => handleChange(e)}
                        >
                            {types.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <FormControlLabel
                        control={<Checkbox sx={{color:'#1f2937','&.Mui-checked': {
                            color: "#1f2937",
                        }}}/>}
                        checked={resData.exportIncluded}
                        label="Added in Export"
                        name="exportIncluded"
                        onChange={(e) => handleChange(e)}
                    />
                    <span
                        title="copy URL"
                        data-full_url={(
                            resData.apiBaseUrl + resData.apiEndUrl
                        ).toString()}
                        onClick={handleCopy}
                        className="bg-white rounded-full p-2 drop-shadow-lg cursor-pointer"
                    >
                        <ContentCopyIcon className="copy-icon" />
                    </span>
                    <Button
                        style={{
                            borderRadius: 0,
                            backgroundColor: "#1f2937",
                        
                        }}
                        type="submit"
                        variant="contained"
                        onClick={(e) => handleSubmit(resData._id)}
                    >
                        Update
                    </Button>
                </form>
            ) : null}
        </>
    );
}

export default ApiUpdateForm;
