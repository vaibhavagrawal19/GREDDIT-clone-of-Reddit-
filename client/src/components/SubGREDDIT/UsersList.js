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
import Container from '@mui/material/Container';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleIcon from '@mui/icons-material/People';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Navigate } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReportIcon from '@mui/icons-material/Report';
import { useState } from "react";
import { Button } from "@mui/material";
import CreatePost from './createPost';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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

function Content({ currGredDetails, setCurrGredDetails }) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [openForm, setOpenForm] = useState(false);

    console.log(currGredDetails.pendingUserdata);

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
                            {currGredDetails.gred.title}
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


                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText primary="Joining Requests" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Stats" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            localStorage.removeItem("refreshToken");
                        }
                        }>
                            <ListItemIcon>
                                <ReportIcon />
                            </ListItemIcon>
                            <ListItemText primary="Reported" />
                        </ListItemButton>



                        {/* <Divider sx={{ my: 1 }} />
                        {secondaryListItems} */}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >

                    {
                        (<div>
                            <Toolbar />
                            <Toolbar />
                            <Toolbar />
                            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                                <Grid container spacing={3}>
                                    {/* Chart */}
                                    <Grid item xs={12} md={8} lg={12}>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: "auto",
                                            }}
                                        >
                                            <h1>Users</h1>
                                            {/* <Chart /> */}
                                            <ul>
                                                {currGredDetails.allowedUserData.map((user) => (
                                                    <li>{user.username}</li>
                                                ))}
                                            </ul>

                                        </Paper>
                                    </Grid>
                                    {/* Recent Deposits */}
                                    <Grid item xs={12} md={4} lg={12}>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: "auto",
                                            }}
                                        >   
                                            <h1>Blocked Users</h1>
                                            <ul>
                                                {currGredDetails.blockedUserData.map((user) => (
                                                    <li>{user.username}</li>
                                                ))}
                                            </ul>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Container>
                        </div>)}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function UsersList({ currGredDetails, setCurrGredDetails }) {
    console.log("me");
    if (!currGredDetails) {
        return <Navigate to="/" />;
    }

    if (currGredDetails.gred.allowedUsers.length === 0) {
        setCurrGredDetails({
            ...currGredDetails,
            allowedUserData: true,
        });
    }
    if (currGredDetails.gred.blockedUsers.length === 0) {
        setCurrGredDetails({
            ...currGredDetails,
            blockedUserData: true,
        });
    }

    if (currGredDetails.allowedUserData && currGredDetails.blockedUserData) {
        return <Content currGredDetails={currGredDetails} setCurrGredDetails={setCurrGredDetails} />
    }


    if (!currGredDetails.allowedUserData) {
        let allowedUserData = new Array(currGredDetails.gred.allowedUsers.length);
        for (let i = 0; i < currGredDetails.gred.allowedUsers.length; i++) {
            fetch("http://localhost:4000/users/oneuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
                    "id": String(currGredDetails.gred.allowedUsers[i]),
                },

            })
                .then(
                    (res) => {
                        if (res.ok) {
                            res.json().then(
                                (body) => {
                                    allowedUserData[i] = body.user;
                                    if (i == allowedUserData.length - 1) {
                                        setCurrGredDetails({
                                            ...currGredDetails,
                                            allowedUserData,
                                        });
                                    }
                                }
                            )
                        }
                    }
                )
        }
    }

    if (!currGredDetails.blockedUserData) {
        let blockedUserData = new Array(currGredDetails.gred.blockedUsers.length);
        for (let i = 0; i < currGredDetails.gred.blockedUsers.length; i++) {
            fetch("http://localhost:4000/users/oneuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
                    "id": String(currGredDetails.gred.blockedUsers[i]),
                },

            })
                .then(
                    (res) => {
                        if (res.ok) {
                            res.json().then(
                                (body) => {
                                    blockedUserData[i] = body.user;
                                    if (i == blockedUserData.length - 1) {
                                        setCurrGredDetails({
                                            ...currGredDetails,
                                            blockedUserData,
                                        });
                                    }
                                }
                            )
                        }
                    }
                )
        }
    }
    return <div>Loading...</div>;
}