import React from 'react';
import { Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
const user = [
    {
        id: 1,
        // name: "Anamul",
        image: "https://www.w3schools.com/howto/img_avatar.png"
    }
]

const MenuLoginIcon = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip
                title={user[0].name ? user[0].name : "Please login"}
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
                            user[0].name ? <PersonIcon /> : <PersonOutlineIcon />
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
                {user[0].name ? (
                    <>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem onClick={handleClose}>Login</MenuItem>
                        <MenuItem onClick={handleClose}>Register</MenuItem>
                    </>
                )}
            </Menu>
        </div>
    );
};

export default MenuLoginIcon;
