import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleIcon from '@mui/icons-material/People';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState } from "react";
import { useNavigate, Navigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GredsLoader from './GredsLoader/GredsLoader';
import CreateGred from './CreateGred';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function Content({ userDetails, setUserDetails, myGredDetails, setMyGredDetails }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [openForm, setOpenForm] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            My Sub-GREDDIITS
                        </Typography>
                        {/* <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>

                    {/* this is the toggle button for the drawer */}
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>


                    {/* these are the items displayed on the toolbar */}
                    <Divider />
                    <List component="nav">


                        <ListItemButton onClick={() => {
                            navigate("/profile");
                        }}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            setOpenForm(false);
                        }}>
                            <ListItemIcon>
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Sub-GREDDIITS" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            navigate("/allgreds");
                        }}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Sub-GREDDIITS" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            localStorage.removeItem("refreshToken");
                            setUserDetails(false);
                            navigate("/");
                        }
                        }>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="LOGOUT" />
                        </ListItemButton>
                    </List>
                </Drawer>



                {openForm === false ? <GredsLoader userDetails={userDetails} myGredDetails={myGredDetails} setOpenForm={setOpenForm} setMyGredDetails={setMyGredDetails} /> : <CreateGred userDetails={userDetails} myGredDetails={myGredDetails} setMyGredDetails={setMyGredDetails} setOpenForm={setOpenForm} />}
            </Box>
        </ThemeProvider>
    );
}

export default function GredsPage({ userDetails, setUserDetails, myGredDetails, setMyGredDetails }) {
    const navigate = useNavigate();
    if (!localStorage.getItem("refreshToken")) {
        return <Navigate to="/" />;
    }
    if (userDetails && myGredDetails) {
        return <Content userDetails={userDetails} setUserDetails={setUserDetails} myGredDetails={myGredDetails} setMyGredDetails={setMyGredDetails} />;
    }
    else if (userDetails) {
        fetch("http://localhost:4000/greds/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids: userDetails.subGreds })
        })
            .then(
                (res) => {
                    if (res.ok) {
                        res.json()
                            .then((body) => {
                                body = body.gredsList;
                                setMyGredDetails(body);
                                return <Content userDetails={userDetails.gredsList} setUserDetails={setUserDetails} myGredDetails={myGredDetails} setMyGredDetails={setMyGredDetails} />;
                            });
                    }
                    else {
                        res.json()
                            .then((body) => {
                                let errMsg = body.message;
                                console.log(errMsg);
                            });
                    }
                }
            )

    }
    else {
        fetch("http://localhost:4000/auth/refresh", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "refreshToken": localStorage.getItem("refreshToken"),
            },
        })
            .then(
                (res) => {
                    if (res.ok) {
                        let body = res.json();
                        body.then((body) => {
                            setUserDetails(body);
                        });
                    }
                    else {
                        return navigate("/");
                    }
                }
            )
            .catch((err) => {
                console.log(err);
            });

        return (
            <div>
                Loading...
            </div>
        )
    }
}