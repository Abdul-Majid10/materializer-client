import { userRequest } from "../middleware/requestMethods";
import { toast } from "react-hot-toast";

export const create = async (name) => {
    const projectCreation = toast.loading("Creating...");
    try {
        const res = await userRequest().post("/project/create", { name });
        toast.dismiss(projectCreation);
        toast.success(res.data?.msg ?? "Project Createded Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(projectCreation);
        toast.error(err?.response?.data?.error ?? "Error While Creating Collection...");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Error While Creating Collection...",
        });
    }
};

export const isProjectExist = async (name) => {
    const verifying = toast.loading("verifying...");
    try {
        const res = await userRequest().get("/project/exist", {
            params: { name },
        });
        toast.dismiss(verifying);
        if (res.status === 200) {
            return res.data.exist;
        }
    } catch (error) {
        toast.dismiss(verifying);
        return false;
    }
};

export const deleteProject = async (id) => {
    let deleting = toast.loading("Deleting Project...");
    try {
        const res = await userRequest().post(`/project/delete`, { id });
        toast.dismiss(deleting);
        toast.success(res.data.msg ?? "Project Deleted Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(deleting);
        toast.error(err?.response?.data?.error ?? "Couldn't Delete Project...!");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Delete Project...!",
        });
    }
};

export const update = async (body) => {
    let updating = toast.loading("Updating");
    try {
        const res = await userRequest().put(`/project/update`, body);
        toast.dismiss(updating);
        toast.success(res.data.msg ?? "Project Updated");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(updating);
        toast.error(err?.response?.data?.error ?? "Couldn't Update Project Configs...!");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Update Configs...!",
        });
    }
};

export const exportProject = async (project, client, server) => {
    let exporting = toast.loading("Exporting");
    try {
        userRequest()
            .get(`/project/export/${project}/${client?1:0}/${server?1:0}`, { responseType: "blob" })
            .then((res) => {
                const blob = new Blob([res.data], { type: "application/zip" });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `Materializer_${project}.zip`;
                link.click();
                toast.dismiss(exporting);
            });

    } catch (err) {
        toast.dismiss(exporting);
        toast.error(err?.response?.data?.error ?? "Couldn't export Project");
        return Promise.reject({
            error: err?.response?.data?.error ?? "Couldn't Export ",
        });
    }
};
