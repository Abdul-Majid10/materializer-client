// collection related helper function goes here
import { toast } from "react-hot-toast";
import { getCollectionByProject } from "../redux/CollectionApiCalls";

export const collectionAttributesTypes = [
    { label: "String", value: "String" },
    { label: "Date", value: "Date" },
    { label: "Number", value: "Number" },
    { label: "Boolean", value: "Boolean" },
    { label: "Array", value: "Array" },
];

export const allCollectionSelectBox = async (project) => {
    const collection = [];

    let result = await getCollectionByProject(project);

    if (result) {
        result.data.map((data) =>
            collection.push({
                label: data.collectionName,
                value: data._id,
            })
        );
    }

    return collection;
};

export const validateAndGetJson = (schemaAttributes) => {
    let hasDuplicate = hasDuplicateNames(schemaAttributes);
    if (!hasDuplicate) {
        var convertedJson = schemaAttributes.reduce(function (acc, cur, i) {
            let { name, ...rest } = cur;
            acc[name] = rest;
            return acc;
        }, {});
        return isValidJson(JSON.stringify(convertedJson));
    }
};

export const hasDuplicateNames = (arr) => {
    const names = new Set();
    for (const obj of arr) {
        if (!obj.name || !obj.type) {
            toast.error("Name and Type both are required for all fields.");
            return true;
        }
        if (names.has(obj.name)) {
            toast.error("Duplicate Name are not allowed. Names must be unique.");
            return true;
        }
        names.add(obj.name);
    }
    return false;
};

export const isValidJson = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        toast.error("Something went wrong. Error While Json conversion, Json is not valid.");
        return false;
    }
};
