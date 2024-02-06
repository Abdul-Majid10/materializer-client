import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { logout } from "../redux/reducers/userRedux";
import { reset } from "../redux/reducers/projectRedux";
import "../Styles/header.css";

function Header(props) {
    const { currentUser } = useSelector((state) => state.user);
    const [menuSideClass, setMenuSlideClass] = useState("menu-slide-right");

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
    };

    function handleClassChange() {
        setMenuSlideClass(
            menuSideClass === "menu-slide-right"
                ? "menu-slide-left"
                : "menu-slide-right"
        );
    }
    return (
        <>
            <div className="page-header">
                <Link className="header-content" to="/">
                    <img src={Logo} alt="logo" className="w-12 logo" />
                    <h1 className="uppercase text-2xl lg:text-3xl font-bold">
                        Materializer
                    </h1>
                </Link>
                <div className="header-menu">
                    <Button
                        className={props?.activePage === "home" ? "active" : ""}
                        variant="elevated"
                    >
                        <Link to="/">Home</Link>
                    </Button>
                    {currentUser?.token ? (
                        <>
                            <Button
                                className={
                                    props?.activePage === "projects"
                                        ? "active"
                                        : ""
                                }
                                variant="elevated"
                            >
                                <Link to="/projects">Projects</Link>
                            </Button>
                            <Button
                                className={
                                    props?.activePage === "media"
                                        ? "active"
                                        : ""
                                }
                                variant="elevated"
                            >
                                <Link to="/media">Media Library</Link>
                            </Button>
                            <Button
                                className={
                                    props?.activePage === "backend"
                                        ? "active"
                                        : ""
                                }
                                variant="elevated"
                            >
                                <Link to="/backend">Backend Designer</Link>
                            </Button>
                            <Button
                                className={
                                    props?.activePage === "frontend"
                                        ? "active"
                                        : ""
                                }
                                variant="elevated">
                                <Link to="/frontend">Frontend Designer</Link>
                            </Button>
                        </>
                    ) : null}
                    <Button
                        className={
                            props?.activePage === "user-guide" ? "active" : ""
                        }
                        variant="elevated"
                    >
                        <Link to="/user-guide">User Guide</Link>
                    </Button>
                </div>
                {currentUser?.token ? (
                    <>
                        <div>
                            <div className="header-content hidden lg:block">
                                <Menu />
                            </div>
                            <div
                                onClick={handleClassChange}
                                className="header-content block lg:hidden"
                            >
                                <MenuIcon fontSize="large" />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className=" hidden lg:block">
                            <div className="header-content">
                                <Link to="/login">
                                    <Button
                                        variant="contained"
                                        className="login"
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#1f2937"
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button
                                        variant="contained"
                                        className="register"
                                        style={{
                                            borderRadius: 0,
                                            backgroundColor: "#1f2937"
                                        }}
                                    >
                                        SignUp
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div
                            onClick={handleClassChange}
                            className="header-content block lg:hidden"
                        >
                            <MenuIcon fontSize="large" />
                        </div>
                    </>
                )}
            </div>
            <div className={"lg:hidden block " + menuSideClass}>
                <div className="menu-page-header">
                    <div>
                        <img src={Logo} alt="logo" className="w-12 logo" />
                        <h1 className="uppercase text-2xl lg:text-3xl font-bold">
                            Materializer
                        </h1>
                    </div>
                    <button onClick={handleClassChange}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="menu-page-body">
                    <ul>
                        <Link to="/">
                            <li className={props?.activePage === "home" ? "active" : ""}>Home</li>
                        </Link>
                        {currentUser?.token ? (
                            <>
                                <Link to="/projects">
                                    <li className={
                                        props?.activePage === "projects"
                                            ? "active"
                                            : ""
                                    }>Project</li>
                                </Link>
                                <Link to="/media">
                                    <li className={
                                        props?.activePage === "media"
                                            ? "active"
                                            : ""
                                    }>Media Library</li>
                                </Link>
                                <Link to="/backend">
                                    <li className={
                                        props?.activePage === "backend"
                                            ? "active"
                                            : ""
                                    }>Backend Designer</li>
                                </Link>
                                <Link to="/frontend">
                                    <li className={
                                        props?.activePage === "frontend"
                                            ? "active"
                                            : ""
                                    }>Frontend Designer</li>
                                </Link>
                            </>
                        ) : null}
                        <Link to="/user-guide">
                            <li className={
                                props?.activePage === "user-guide" ? "active" : ""
                            }>User Guide</li>
                        </Link>
                        {currentUser?.token ? (
                            <>
                                <Link to="/profile">
                                    <li>Profile</li>
                                </Link>
                                <Link onClick={handleLogout}>
                                    <li className="bg-red-100">Log out</li>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <li className="bg-green-100">login</li>
                                </Link>
                                <Link to="/register">
                                    <li className="bg-green-100">signup</li>
                                </Link>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Header;
