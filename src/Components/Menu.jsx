import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/userRedux";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import avatar from "../assets/profile.png";
import PersonIcon from '@mui/icons-material/Person';
import { reset } from "../redux/reducers/projectRedux";


export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
    };

    const getUserNameLabel = () => {
        if (currentUser.firstName && currentUser.lastName) {
            return currentUser.firstName + " " + currentUser.lastName;
        } else if (currentUser.firstName || currentUser.lastName) {
            return currentUser.firstName ? currentUser.firstName : currentUser.lastName;
        }
        return currentUser.username;
    };

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <div className="heder-profile">
                    <div className="img-box">
                        <img src={currentUser?.profile ?? avatar} alt="header-profile" />
                    </div>
                    <span className="profile-content">
                        <i>{getUserNameLabel()}</i>{" "}
                        <span className="one-line-text">{currentUser?.email}</span>
                    </span>
                </div>

                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <Link to="/profile">
                    <MenuItem>
                        <div className="profile">
                            <div className="menu-profile">
                                <div className="img-box">
                                    <img src={currentUser?.profile ?? avatar} alt="profile" />
                                </div>
                                {currentUser?.username}
                            </div>
                        </div>
                    </MenuItem>
                </Link>
                <Divider />
                <Link to="/profile">
                    <MenuItem>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
