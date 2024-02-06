import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/validate";
import { useNavigate, Navigate, Link, useLocation } from "react-router-dom";
import {
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useFetch } from "../Hooks/useFetch.hook";
import { resetPassword } from "../redux/RegistrationApiCalls";

export default function Reset() {
    const { state } = useLocation();
    const { username } = state;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();
    const { response, loading, error } = useFetch(
        'public',
        "/registration/createResetSession",
        "get"
    );

    const formik = useFormik({
        initialValues: {
            password: "",
            confirm_pwd: "",
        },
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let resetPromise = resetPassword({ username, password: values.password });
            resetPromise.then((res) => {
                if (res.status === 201) {
                    navigate("/login");
                }
            });
        },
    });

    if (loading)
        return (
            <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
                <CircularProgress />
            </h1>
        );
    if (error) return <h1 className="text-xl text-red-500">{error.message}</h1>;
    if (response.status && response.status !== 201)
        return <Navigate to={"/login"} replace={true}></Navigate>;

    return (
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div>
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="w-2/4">
                        <div className="text-center">
                            <h4 className="text-5xl mb-8 font-bold">Reset Password</h4>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="textbox flex flex-col items-center gap-6">
                                <TextField
                                    className="w-2/4"
                                    label="Password"
                                    id="password"
                                    value={formik.values.password}
                                    type={showPassword ? "text" : "password"}
                                    required={true}
                                    onChange={formik.handleChange}
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
                                <TextField
                                    className="w-2/4"
                                    label="Confirm Password"
                                    value={formik.values.confirmPassword}
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    onChange={formik.handleChange}
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
                                    Reset
                                </Button>
                            </div>

                            <div className="text-center py-4">
                                <span className="text-gray-500">
                                    Don't want to reset or somthing went wrong?{" "}
                                    <Link className="text-blue-500" to="/">
                                        Back to Home
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
