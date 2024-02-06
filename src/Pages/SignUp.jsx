import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login, register } from "../redux/RegistrationApiCalls";
import { useDispatch } from "react-redux";
import '../Styles/forms.css';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let registerPromise = register(dispatch, values);
            registerPromise.then(function () {
                let loginPromise = login(dispatch, values);
                loginPromise.then(()=>{
                    navigate("/");
                })
            });
        },
    });

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div>
                <div className="flex flex-col justify-center items-center h-screen">
                    <div className="signUp-form">
                        <div className="text-center">
                            <h4 className="text-5xl mb-8 font-bold">Register</h4>
                        </div>
                        
                        <form onSubmit={formik.handleSubmit}>
                            <div className="textbox flex flex-col items-center gap-6">
                                <TextField
                                    className="text-field"
                                    label="Email"
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    required={true}
                                    // error={true}
                                    type="text"
                                />
                                <TextField
                                    className="text-field"
                                    label="Username"
                                    id="username"
                                    value={formik.values.username}
                                    type="text"
                                    onChange={formik.handleChange}
                                    required={true}
                                />
                                <TextField
                                    className="text-field"
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
                                    className="text-field"
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
                                }}>
                                    Register
                                </Button>
                            </div>

                            <div className="text-center py-4">
                                <span className="text-gray-500">
                                    Already Register?{" "}
                                    <Link className="text-red-500" to="/login">
                                        Login Now
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
