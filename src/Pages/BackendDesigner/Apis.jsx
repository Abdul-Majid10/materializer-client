import { CircularProgress, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allCollectionSelectBox } from "../../helper/collectionHelper";
import { Link } from "react-router-dom";
import ApisDetails from "../../Components/ApisDetails";
import "../../Styles/api.css";

function Apis() {
    const { project } = useSelector((state) => state.project);

    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState("");
    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        setSelectedCollection(e.target.value);
    };

    const setCollectionsData = async (project) => {
        setLoading(true);
        let result = await allCollectionSelectBox(project);
        if (result) setCollections(result);
        setLoading(false);
    };

    useEffect(() => {
        setCollectionsData(project);
        setSelectedCollection("");
    }, [project]);

    return (
        <>
            <div className="page-header-block">
                <h1 className="page-heading">APIs</h1>
            </div>
            {collections.length ? (
                <>
                    <div className="collacollection-name-search-box">
                        <TextField
                            id="name"
                            value={selectedCollection}
                            sx={{ width: 800 }}
                            label="Collection Name"
                            name="name"
                            select
                            onChange={(e) => handleChange(e)}
                        >
                            {collections.length
                                ? collections.map((option) => (
                                    <MenuItem
                                        key={option.label}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))
                                : null}
                        </TextField>
                    </div>
                    {selectedCollection ? (
                        <ApisDetails collectionId={selectedCollection} />
                    ) : (
                        <p className="api-collection-create h-[70vh] flex justify-center items-center">
                            Please select collection name from list{" "}
                        </p>
                    )}
                </>
            ) : loading ? (
                <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
                    <CircularProgress />
                </h1>
            ) : (
                <p className="api-collection-create h-[70vh] flex justify-center items-center">
                    <h3>
                        You have no collection please create collection first.{" "}
                        <Link to={"/backend/collection/new"}>click here</Link>
                    </h3>
                </p>
            )}
        </>
    );
}

export default Apis;
