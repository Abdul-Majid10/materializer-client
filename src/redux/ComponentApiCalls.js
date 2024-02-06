import { userRequest } from "../middleware/requestMethods";

export const getProjectByQueryParam = async (query) => {
    try {
        const res = await userRequest().get("/admin/component/get/query", {
            params: { query },
        });

        if (!res) return [];
        return res.data;
    } catch (error) {
        return [];
    }
};
