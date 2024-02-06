import { loginFailure, loginStart, loginSuccess, updateData } from "./reducers/userRedux";
import { publicRequest, userRequest } from "../middleware/requestMethods";
import { toast } from "react-hot-toast";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    const loginLoading = toast.loading("Loading...");
    try {
        const { username, password } = user;
        const res = await publicRequest.post("/registration/login", { username, password });
        dispatch(loginSuccess(res.data));
        toast.dismiss(loginLoading);
        toast.success("Login Successfully...!");
        return Promise.resolve(res);
    } catch (err) {
        dispatch(loginFailure());
        toast.dismiss(loginLoading);
        toast.error("Password doesn't Match...!");
        return Promise.reject({ error: err.error ?? "Password doesn't Match...!" });
    }
};

export const register = async (dispatch, user) => {
    dispatch(loginStart());
    const resgisterLoading = toast.loading("Loading...");
    try {
        const res = await publicRequest.post("/registration/register", user);

        let { username, email } = user;
        if (res?.status) {
            dispatch(loginSuccess(res.data));
            await sendMail(username, email, res?.msg);
            toast.dismiss(resgisterLoading);
            toast.success("Account Created Successfully....");
        }

        return Promise.resolve(res);
    } catch (err) {
        dispatch(loginFailure());
        toast.dismiss(resgisterLoading);
        toast.error(
            err.isAxiosError ? err?.response?.data?.error?.error : "Unable to create account"
        );
        return Promise.reject({
            error: err.isAxiosError
                ? err?.response?.data?.error?.error ?? " Server Error"
                : "Unable to create account",
        });
    }
};

export const sendMail = async (username, userEmail, text) => {
    try {
        let res = await publicRequest.post("/registration/registerMail", {
            username,
            userEmail,
            text,
        });
        return res;
    } catch (error) {
        toast.error("Unable to Send Account Creation successfull email.");
    }
};

export const authenticate = async (username) => {
    try {
        let res = await publicRequest.post("/registration/authenticate", { username });
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject({
            error: err.isAxiosError
                ? err?.response?.data?.error ?? " Server Error"
                : "Username is not Exist",
        });
    }
};

export const resetPassword = async ({ username, password }) => {
    try {
        let resetLoading = toast.loading("Loading...");
        const res = await publicRequest.put("/registration/resetPassword", { username, password });
        toast.dismiss(resetLoading);
        toast.success("Password Reset Successfully.");
        return Promise.resolve(res);
    } catch (err) {
        return Promise.reject({
            error: err.isAxiosError
                ? err?.response?.data?.error ?? " Server Error"
                : "Unable to reset Password",
        });
    }
};

export const updateUser = async (dispatch, params) => {
    let updating = toast.loading("Updating");
    try {
        const res = await userRequest().put("/registration/updateuser", params);
        toast.dismiss(updating);
        toast.success(res.data.msg ?? "Account Updated");
        dispatch(updateData(res.data));
        return Promise.resolve(res);
    } catch (error) {
        toast.dismiss(updating);
        toast.error("Couldn't Update Profile...!");
        return Promise.reject({ error: "Couldn't Update Profile...!" });
    }
};

export const deleteUserAccount = async (username) => {
    let deleting = toast.loading("Deleting Acccount...");
    try {
        const res = await userRequest().post("/registration/deleteAccount", { username });
        toast.dismiss(deleting);
        toast.success(res.data.msg ?? "Account Deleted Successfully.");
        return Promise.resolve(res);
    } catch (error) {
        toast.dismiss(deleting);
        toast.error("Couldn't Delete Account...!");
        return Promise.reject({ error: "Couldn't Delete Account...!" });
    }
};

/** verify OTP */
export const verifyOTP = async ({ username, code }) => {
    try {
        const { data, status } = await publicRequest.get("/registration/verifyOTP", {
            params: { username, code },
        });
        return { data, status };
    } catch (error) {
        return Promise.reject(error);
    }
};

/** generate OTP */
export const generateOTP = async (usernameOrEmail) => {
    try {
        const {
            data: { code },
            status,
        } = await publicRequest.get("/registration/generateOTP", { params: { username: usernameOrEmail } });

        // send mail with the OTP
        if (status === 201) {
            let {
                data: { username ,email},
            } = await getUser({ username: usernameOrEmail });
            let text = `Your Password Recovery OTP is <b style="font-size: 25px">${code}</b>. Verify and recover your password.`;
            await publicRequest.post("/registration/registerMail", {
                username : username,
                userEmail: email,
                text,
                subject: "Password Recovery OTP",
            });
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
};

/** get User details */
export const getUser = async ({ username }) => {
    try {
        const { data } = await publicRequest.get(`/registration/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match...!" };
    }
};
