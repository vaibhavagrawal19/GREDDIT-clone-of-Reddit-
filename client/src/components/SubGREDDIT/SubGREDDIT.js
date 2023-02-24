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
import { Navigate, useNavigate } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReportIcon from '@mui/icons-material/Report';
import { useState } from "react";
import { Button } from "@mui/material";
import CreatePost from './createPost';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import { ListItem } from '@mui/material';

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

function Content({ currGredDetails, setCurrGredDetails, setUserDetails }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [openForm, setOpenForm] = useState(false);

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
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            navigate("/mygreds");
                        }}>
                            <ListItemIcon>
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Sub-GREDDITS" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            navigate("/allgreds");
                        }}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Sub-GREDDITS" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            navigate("/saved");
                        }}>
                            <ListItemIcon>
                                <SaveIcon />
                            </ListItemIcon>
                            <ListItemText primary="Saved Posts" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            localStorage.removeItem("refreshToken");
                            setUserDetails(false);
                            console.log("here");
                            navigate("/");
                        }}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="LOGOUT" />
                        </ListItemButton>


                        <Divider sx={{ my: 1 }} />

                        {currGredDetails && <div>
                            <ListItem style={{cursor: "default", color: "black"}}>
                                <ListItemText primary={currGredDetails.gred.title} />
                            </ListItem>
                            <ListItemButton onClick={() => {
                                navigate("/mygreds/gred/users");
                            }}>
                                <ListItemIcon>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                            <ListItemButton onClick={() => {
                                navigate("/mygreds/gred/joinReq");
                            }
                            }>
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
                                navigate("/mygreds/gred/reports");
                            }
                            }>
                                <ListItemIcon>
                                    <ReportIcon />
                                </ListItemIcon>
                                <ListItemText primary="Reported" />
                            </ListItemButton>

                        </div>}

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

                    {openForm ? <CreatePost currGredDetails={currGredDetails} setOpenForm={setOpenForm} setCurrGredDetails={setCurrGredDetails} /> :
                        (<div>
                            <Toolbar />
                            <Toolbar />
                            <Container>
                                <center>
                                    <Button variant="contained" onClick={() => {
                                        setOpenForm(true);
                                    }}>Post something!</Button>
                                </center>
                            </Container>
                            <Toolbar />
                            <Container maxWidth="lg">
                                <Grid container spacing={4}>
                                    {currGredDetails.postDetails.map((post) => (
                                        <Grid item xs={6} md={12}>

                                            <Card sx={{ display: 'flex' }}>
                                                <CardContent sx={{ flex: 1 }}>
                                                    <Typography component="h2" variant="h5">
                                                        {post.title}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary">
                                                        by {post.username}
                                                    </Typography>
                                                    <Toolbar />
                                                    <Typography variant="subtitle1" paragraph>
                                                        {post.desc}
                                                    </Typography>
                                                </CardContent>
                                                <CardContent>
                                                    <Button variant="contained" disabled={false}>FOLLOW</Button>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>
                        </div>)}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function SubGREDDIT({ currGredDetails, setCurrGredDetails, setUserDetails }) {
    if (!currGredDetails) {
        return <Navigate to="/" />;
    }

    if (currGredDetails.postDetails) {
        console.log(currGredDetails.postDetails)
        return <Content currGredDetails={currGredDetails} setCurrGredDetails={setCurrGredDetails} setUserDetails={setUserDetails} />;
    }

    console.log(currGredDetails);

    fetch("http://localhost:4000/greds/onegred", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "id": String(currGredDetails),
            "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
        },
    })
        .then(
            (res) => {
                if (res.ok) {
                    res.json().then(
                        (body) => {
                            console.log(body);
                            // the currGredDetails is now set to contain the entire information about the subgred, earlier it only had the subgred's id
                            setCurrGredDetails(body);
                        }
                    )
                }
            }
        );
    return <div>Loading...</div>;
}