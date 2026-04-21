import React from 'react';
import { Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MenuLoginIcon = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip
                title={authUser?.name ? authUser.name : "Please login"}
                arrow
                placement="top"
            >
                <IconButton
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Avatar sx={{ width: 32, height: 32, backgroundColor: '#ECF5E8', color: "black" }}>

                        {
                            authUser?.name ? <PersonIcon /> : <PersonOutlineIcon />
                        }
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                arrow
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {authUser?.name ? (
                    <>
                        {authUser?.role === "farmer" && (
                            <MenuItem
                                onClick={() => {
                                    navigate("/admin/products");
                                    handleClose();
                                }}
                            >
                                Farmer Dashboard
                            </MenuItem>
                        )}
                        <MenuItem
                            onClick={() => {
                                navigate("/profile");
                                handleClose();
                            }}
                        >
                            Profile
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                logout();
                                handleClose();
                                navigate("/");
                            }}
                        >
                            Logout
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem
                            onClick={() => {
                                navigate("/login");
                                handleClose();
                            }}
                        >
                            Login
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                navigate("/register");
                                handleClose();
                            }}
                        >
                            Register
                        </MenuItem>
                    </>
                )}
            </Menu>
        </div>
    );
};

export default MenuLoginIcon;
