import { userRequest } from "../middleware/requestMethods";
import { toast } from "react-hot-toast";

export const upload = async (formData) => {
    const filesUploadingLoading = toast.loading("Uploading...");
    try {
        const res = await userRequest().post("/media/upload", formData);
        toast.dismiss(filesUploadingLoading);
        toast.success(res.data?.msg ?? "Images Uploaded Successfully");
        return Promise.resolve(res);
    } catch (err) {
        toast.dismiss(filesUploadingLoading);
        toast.error(err?.response?.data?.error ?? "Error While Uploading Images..");
        return Promise.reject({ error: err?.response?.data?.error ?? "Error While Uploading Images.."});
    }
};


export const deleteMediaById = async (id) => {
    let deleting = toast.loading("Deleting image...");
    try {
        const res = await userRequest().post(`/media/delete/${id}`);
        toast.dismiss(deleting);
        toast.success(res.data.msg ?? "Image Deleted Successfully.");
        return Promise.resolve(res);
    } catch (error) {
        toast.dismiss(deleting);
        toast.error("Couldn't Delete Image...!");
        return Promise.reject({ error: "Couldn't Delete Image...!" });
    }
};
