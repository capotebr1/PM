import { AddTask, Home, Logout, Task, TaskAlt } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeVisibility } from './actions/taskActions';
import Cookies from 'js-cookie';
import { deepPurple } from '@mui/material/colors';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MenuIcon from '@mui/icons-material/Menu';
function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ open, setOpen ] = useState(false);
    let {id, name, email} = Cookies.get();

    const handleLogout = () => {     
        Cookies.remove("id");          
        Cookies.remove("email");          
        Cookies.remove("name");          
        localStorage.clear("user");
        navigate("/login");
    }

    return (
        <>
            <Drawer
                sx={{
                    transition: ".3s cubic-bezier(0.19, 1, 0.22, 1)",
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent:"space-between",
                        p: "0px",
                        overflowX: "clip",
                        bgcolor: "#fff"
                    },
                  }}
                  variant="permanent"
                  anchor="left"
            >
                <Box sx={{ p: 1, display: "flex", gap: 1, alignItems: "center", justifySelf: "flex-start"  }}>
                    <Stack alignItems="center">
                        <IconButton onClick={() => setOpen(!open)}>
                            <MenuIcon/>
                        </IconButton>
                        <Box display="flex" mt={1} gap={1}>
                            {
                                open &&
                                <Typography fontWeight="bold">
                                    Hello, <br /> {name}
                                </Typography>
                            }
                            <Avatar>
                                {(name).split("")[0].toUpperCase()}
                            </Avatar>
                        </Box>
                    </Stack>
                </Box>
                <List>
                    {
                        [{ redirect: "Home", path: "/", icon: <Home/> }].map(item => (
                            <ListItem key={item.path}>
                                <ListItemButton 
                                    onClick={() => navigate("/")}
                                    sx={{ borderRadius: 100, border: "1px solid #cbcbcb" }}
                                >
                                    {item.icon}
                                    { open && 
                                        <ListItemText>
                                            <Typography>
                                                {item.redirect}
                                            </Typography>
                                        </ListItemText>
                                    }
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
                <Stack direction="row" spacing={1} m={1} alignItems="center">
                    <Button  color='warning' onClick={handleLogout}>
                        <Logout/>
                        {
                            open && <Typography ml={1}>Logout</Typography>
                        }
                    </Button>
                </Stack>
            </Drawer>
        </>
    );
}

export default Navbar;