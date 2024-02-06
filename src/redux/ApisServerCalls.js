import { userRequest } from "../middleware/requestMethods";
import { toast } from "react-hot-toast";

export const create = async (data) => {
    const ApiCreation = toast.loading("Creating...");
    try {
        const res = await userRequest().post("/backendApis/create", data);
        toast.dismiss(ApiCreation);
        toast.success(res.data?.msg ?? "Api Createded Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(ApiCreation);
        toast.error(err?.response?.data?.error ?? "Error While Creating Api...");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Error While Creating Api...",
        });
    }
};

export const deleteApi = async (id) => {
    let deleting = toast.loading("Deleting Api...");
    try {
        const res = await userRequest().delete(`/backendApis/delete/${id}`);
        toast.dismiss(deleting);
        toast.success(res.data.msg ?? "API Deleted Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(deleting);
        toast.error(err?.response?.data?.error ?? "Couldn't Delete API...!");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Delete API...!",
        });
    }
};

export const deleteApiByCollection = async (collectionId) => {
    try {
        const res = await userRequest().delete(`/backendApis/deleteByCollection/${collectionId}`);
        toast.success(res.data.msg ?? "APIs Deleted Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Delete APIs...!",
        });
    }
};

export const update = async (id ,body) => {
    let updating = toast.loading("Updating");
    try {
        const res = await userRequest().put(`/backendApis/update/${id}`, body);
        toast.dismiss(updating);
        toast.success(res.data.msg ?? "Api Updated");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(updating);
        toast.error(err?.response?.data?.error ?? "Couldn't Update Api...!");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Update Api...!",
        });
    }
};

export const getApi = async (id) => {
    try {
        const res = await userRequest().get(`/backendApis/get/${id}`);
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject({
            error: err?.response?.data?.error,
        });
    }
};
