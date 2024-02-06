import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { authenticate, login } from "../redux/RegistrationApiCalls";
import '../Styles/forms.css';


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleForgetPassword() {
        let forgetLoading = toast.loading("Loading");
        if (formik.values.username) {
            let checkUserExist = authenticate(formik.values.username);
            checkUserExist
                .then(() => {
                    navigate("/recovery", { state: { username: formik.values.username } });
                })
                .catch((err) => {
                    toast.dismiss(forgetLoading);
                    toast.error(err.error ?? "User with that username is not exist!");
                });
        } else {
            toast.dismiss(forgetLoading);
            toast.error("Must enter username to recover");
        }
        toast.dismiss(forgetLoading);
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let loginPromise = login(dispatch, values);
            loginPromise.then((res) => {
                navigate("/");
            });
        },
    });

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div>
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="login-form">
                        <div className="text-center">
                            <h4 className="text-5xl mb-8 font-bold">Login</h4>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="textbox flex flex-col items-center gap-6">
                                <TextField
                                    id="username"
                                    name="username"
                                    className="text-field"
                                    label="Username / Email"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    type="text"
                                    required={true}
                                />

                                <TextField
                                    className="text-field"
                                    label="Password"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    type={showPassword ? "text" : "password"}
                                    required={true}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end">
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button variant="contained" type="submit" 
                                style={{
                                    borderRadius: 0,
                                    backgroundColor: "#1f2937"
                                }}
                                >
                                    Login
                                </Button>
                            </div>

                            <div className="text-center pt-4">
                                <span className="text-gray-500">
                                    Forget Password?{" "}
                                    <span
                                        className="text-blue-500 text-sm cursor-pointer"
                                        onClick={handleForgetPassword}>
                                        click here
                                    </span>
                                </span>
                            </div>
                            <div className="text-center pt-2 pb-4">
                                <span className="text-gray-500">
                                    Create New Account?{" "}
                                    <Link className="text-red-500" to="/register">
                                        Register Now
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
