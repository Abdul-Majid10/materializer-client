import { userRequest } from "../middleware/requestMethods";
import { toast } from "react-hot-toast";

export const create = async (data) => {
    const collectionCreation = toast.loading("Loading...");
    try {
        const res = await userRequest().post("/collection/create", data);
        toast.dismiss(collectionCreation);
        toast.success(res.data?.msg ?? "Collection Createded Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(collectionCreation);
        toast.error(err?.response?.data?.error ?? "Error While Creating Collection...");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Error While Creating Collection...",
        });
    }
};

export const checkCollectionAlreadyExist = async (data) => {
    const verifying = toast.loading("verifying...");
    try {
        const { project, collectionName } = data;
        const res = await userRequest().get("/collection/isCollectionExist", {
            params: { project, collectionName },
        });
        toast.dismiss(verifying);
        if (res.status === 200 && res.data.exist) {
            toast.error("Collection Already Exist with same name please try diffrent name.");
            return true;
        }
    } catch (error) {
        toast.dismiss(verifying);
        return false;
    }
};

export const deleteCollection = async (id) => {
    let deleting = toast.loading("Deleting Collection...");
    try {
        const res = await userRequest().delete(`/collection/delete/${id}`);
        toast.dismiss(deleting);
        toast.success(res.data.msg ?? "Collection Deleted Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(deleting);
        toast.error(err?.response?.data?.error ?? "Couldn't Delete Collection...!");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Delete Collection...!",
        });
    }
};

export const deleteByProject = async (project) => {
    try {
        const res = await userRequest().delete(`/collection/deleteByProject/${project}`);
        toast.success(res.data.msg ?? "Collections Deleted Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Delete Collection...!",
        });
    }
};

export const update = async (body) => {
    let updating = toast.loading("Updating");
    const { id } = body;
    try {
        const res = await userRequest().put(`/collection/update/${id}`, body);
        toast.dismiss(updating);
        toast.success(res.data.msg ?? "Collection Updated");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(updating);
        toast.error(err?.response?.data?.error ?? "Couldn't Update Collection...!");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Update Collection...!",
        });
    }
};

export const getCollectionByProject = async (project) => {
    try {
        const res = await userRequest().get(`/collection/getProjectCollection`, {
            params: { project },
        });
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject({
            error: err?.response?.data?.error,
        });
    }
};
