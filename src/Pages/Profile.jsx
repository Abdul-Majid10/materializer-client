import React, { useState } from "react";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../Hooks/useFetch.hook";
import { logout } from "../redux/reducers/userRedux";
import Header from "../Components/Header";
import "../Styles/forms.css";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Slide,
    TextField,
} from "@mui/material";
import { deleteUserAccount, updateUser } from "../redux/RegistrationApiCalls";
import { reset } from "../redux/reducers/projectRedux";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const username = currentUser?.username;
    username || navigate("/");

    const [file, setFile] = useState();
    const [previewFile, setPreviewFile] = useState();
    const [changedFlag, setChangedFlag] = useState(false);
    const { response, loading, error } = useFetch(
        'user',
        `/registration/user/${username}`,
        "get"
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            firstName: response?.firstName || "",
            lastName: response?.lastName || "",
            email: response?.email || "",
            mobile: response?.mobile || "",
            address: response?.address || "",
            gender: response?.gender || "",
        },
        enableReinitialize: true,
        validate: profileValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            if (file) values = await Object.assign(values, { profile: file })
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }
            updateUser(dispatch, formData);
        },
    });

    /** formik doensn't support file upload so we need to create this handler */
    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setPreviewFile(base64);
        setChangedFlag(true);
        setFile(e.target.files[0]);
    };

    // logout handler function
    function userLogout() {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    }

    // delete handler function
    function userDelete() {
        let res = deleteUserAccount(username);
        res.then((res) => {
            if (res.status === 204) {
                dispatch(logout());
                navigate("/");
            }
        });
    }

    if (loading)
        return (
            <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
                <CircularProgress />
            </h1>
        );
    if (error) return <h1 className="text-xl text-red-500">{error.message}</h1>;

    return (
        <>
            <Header />
            <div className="container my-10 mx-auto">
                <Toaster position="top-center" reverseOrder={false}></Toaster>

                <div className="flex justify-center h-screen body-fheader">
                    <div className="your-profile">
                        <div className="title flex flex-col items-center">
                            <h4 className="text-5xl font-bold">User Profile</h4>
                        </div>

                        <form
                            className="py-1"
                            onSubmit={formik.handleSubmit}
                            encType="multipart/form-data">
                            <div className="profile flex justify-center py-4">
                                <label htmlFor="profile">
                                    <img
                                        className="my-0 mx-auto w-[10rem] h-[10rem] rounded-full"
                                        src={
                                            changedFlag
                                                ? previewFile
                                                : response?.profile?.secureUrl ||
                                                  previewFile || avatar
                                        }
                                        id={response?.profile?.publicId || "avatar_profile"}
                                        alt="avatar"
                                    />
                                </label>
                                <input
                                    className="hidden"
                                    onChange={onUpload}
                                    type="file"
                                    id="profile"
                                    name="profile"
                                    accept="image/*"
                                />
                            </div>
                            <div className="text-slate-400 mt-2 mb-4 text-center">@{username}</div>

                            <div className="textbox flex flex-col items-center gap-6">
                                <div className="name flex w-3/4 gap-10">
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        className="w-2/4"
                                        label="FirstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        type="text"
                                    />
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        className="w-2/4"
                                        label="LastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        type="text"
                                    />
                                </div>

                                <div className="name flex w-3/4 gap-10">
                                    <TextField
                                        className="w-2/4"
                                        label="Mobile No."
                                        id="mobile"
                                        name="mobile"
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                        type="tel"
                                    />
                                    <TextField
                                        select
                                        className="w-2/4"
                                        label="Gender"
                                        id="gender"
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}>
                                        <MenuItem key="male" value="Male">
                                            Male
                                        </MenuItem>
                                        <MenuItem key="female" value="Female">
                                            Female
                                        </MenuItem>
                                    </TextField>
                                </div>
                                <TextField
                                    className="w-2/4"
                                    label="Email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    required={true}
                                    // error={true}
                                    type="text"
                                />
                                <TextField
                                    className="w-2/4"
                                    label="Address"
                                    id="address"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    type="text"
                                    multiline
                                    rows={2}
                                />
                                <Button variant="contained" type="submit"
                                style={{
                                    borderRadius: 0,
                                    backgroundColor: "#1f2937"
                                }}
                                >
                                    Update
                                </Button>
                            </div>
                        </form>
                        <div className="text-center py-4">
                            <span className="text-gray-500">
                                come back later?{" "}
                                <button onClick={userLogout} className="text-red-500">
                                    Logout
                                </button>
                            </span>
                        </div>
                        <div className="text-center pb-4">
                            <span className="text-gray-500">
                                Delete My Account Permanatily.?{" "}
                                <Button 
                                style={{borderRadius: 0}}
                                onClick={handleClickOpen} variant="contained" color="error">
                                    Delete Account
                                </Button>
                                <Dialog
                                    open={open}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={handleClose}
                                    aria-describedby="alert-dialog-slide-description">
                                    <DialogTitle>
                                        {"Are you sure to delete your account permanatily?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-slide-description">
                                            Keep in Mind all the data and your project will be
                                            deleted that can't be recover.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={userDelete} color="error">
                                            Delete
                                        </Button>
                                        <Button onClick={handleClose} variant="contained"
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#1f2937"
                                        }}
                                        >
                                            Cancle
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
