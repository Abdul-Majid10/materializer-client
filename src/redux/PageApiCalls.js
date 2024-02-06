import { userRequest } from "../middleware/requestMethods";
import { toast } from "react-hot-toast";

export const create = async (data) => {
    const pageCreation = toast.loading("Loading...");
    try {
        const res = await userRequest().post("/pages/new", data);
        toast.dismiss(pageCreation);
        toast.success(res.data?.msg ?? "Page Createded Successfully.");
        return Promise.resolve(res?.data?.page);
    } catch (err) {
        toast.dismiss(pageCreation);
        toast.error(err?.response?.data?.error?.error ?? "Error While Creating Page...");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Error While Creating Page...",
        });
    }
};

export const checkPageAlreadyExist = async (data) => {
    const verifying = toast.loading("verifying...");
    try {
        const { project, pageName } = data;
        const res = await userRequest().get("/pages/isPageExist", {
            params: { project, pageName },
        });
        toast.dismiss(verifying);
        if (res.status === 200 && res.data.exist) {
            toast.error("Page Already Exist with same name please try diffrent name.");
            return true;
        }
    } catch (error) {
        toast.dismiss(verifying);
        return false;
    }
};

export const deletePage = async (id) => {
    let deleting = toast.loading("Deleting Page...");
    try {
        const res = await userRequest().delete(`/pages/delete/${id}`);
        toast.dismiss(deleting);
        toast.success(res.data.msg ?? "Page Deleted Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(deleting);
        toast.error(err?.response?.data?.error ?? "Couldn't Delete Page...!");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Delete Page...!",
        });
    }
};

export const deleteByProject = async (project) => {
    try {
        const res = await userRequest().delete(`/pages/deleteByProject/${project}`);
        toast.success(res.data.msg ?? "Pages Deleted Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Delete Pages...!",
        });
    }
};

export const update = async (page_id, body) => {
    let saving = toast.loading("Saving...");
    try {
        const res = await userRequest().put(`/pages/update/${page_id}`, body);
        toast.dismiss(saving);
        toast.success(res.data.msg ?? "Saved Sucessfully");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(saving);
        toast.error(err?.response?.data?.error ?? "Couldn't Save Collection...!");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Save Collection...!",
        });
    }
};
