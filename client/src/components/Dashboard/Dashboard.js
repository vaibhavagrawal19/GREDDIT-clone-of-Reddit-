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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Chart from './Chart';
import ProfileDetails from './ProfileDetails';
import SocialConnect from './SocialConnect';
import TextField from '@mui/material/TextField';
import { Navigate, useNavigate } from "react-router-dom";
import Title from './Title';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReportIcon from '@mui/icons-material/Report';
import { ListItem } from '@mui/material';
import { useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';


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

function EditDetails({ setEdit, setUserDetails }) {
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        username: "",
        age: "",
        errorText: "",
    });

    function handleSubmit() {
        const send = new Object();
        if (state.firstname !== "") {
            send.firstname = state.firstname;
        }
        if (state.lastname !== "") {
            send.lastname = state.lastname;
        }
        if (String(state.age) !== "") {
            send.age = state.age;
        }
        if (state.username !== "") {
            send.username = state.username;
        }

        console.log("about to patch");
        fetch("http://localhost:4000/users/", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
            },
            body: JSON.stringify({
                username: send.username,
                lastname: send.lastname,
                age: send.age,
                username: send.username,
            }),
        })
            .then(
                (res) => {
                    if (res.ok) {
                        res.json().then(
                            (body) => {
                                setEdit(false);
                                setUserDetails(body.updatedUser);
                            }
                        )
                    }
                    else {
                        res.json().then(
                            (body) => {
                                if (String(body.message) === "Username_Duplicate") {
                                    setState({
                                        errorText: "Username not available!",
                                    });
                                }
                            }
                        )
                    }
                }
            )
    }

    function handleChange(event) {
        event.preventDefault();
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }
    return (
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
            <Toolbar />
            <Toolbar />
            <Container maxWidth="lg">
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Toolbar />
                        <Typography component="h1" variant="h5">
                            Edit Details
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                onChange={handleChange}
                                value={state.firstname}
                                margin="normal"
                                fullWidth
                                id="firstname"
                                label="Firstname"
                                name="firstname"
                                autoComplete="lastname"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                value={state.lastname}
                                margin="normal"
                                fullWidth
                                id="lastname"
                                label="Lastname"
                                name="lastname"
                                autoComplete="lastname"
                            />
                            <TextField
                                onChange={handleChange}
                                value={state.age}
                                margin="normal"
                                type="number"
                                fullWidth
                                id="age"
                                label="Age"
                                name="age"
                                autoComplete="age"
                            />
                            <TextField
                                onChange={handleChange}
                                value={state.username}
                                margin="normal"
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                            />
                            <Button
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleSubmit();
                                }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Confirm
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <p style={{ color: "red" }}>
                                        {state.errorText}
                                    </p>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Container>
        </Box>
    );
}

const mdTheme = createTheme();

function DashboardContent({ userDetails, setUserDetails, currGredDetails, setCurrGredDetails }) {
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
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
                            Profile
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
                    </List>
                </Drawer>
                {edit === true ? <EditDetails setEdit={setEdit} setUserDetails={setUserDetails} /> :
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
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12} md={8} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 500,
                                        }}
                                    >
                                        {/* <Chart /> */}
                                        <Title><CreateIcon style={{ cursor: "pointer" }} onClick={
                                            () => {
                                                setEdit(true);
                                            }
                                        }></CreateIcon>{' '}Profile Details</Title>
                                        <ProfileDetails userDetails={userDetails} setUserDetails={setUserDetails} />

                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={4} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 500,
                                        }}
                                    >
                                        <SocialConnect userDetails={userDetails} setUserDetails={setUserDetails} />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>}
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard({ userDetails, setUserDetails, currGredDetails, setCurrGredDetails }) {
    if (!localStorage.getItem("refreshToken")) {
        setUserDetails(false);
        return <Navigate to="/" />;
    }

    if (userDetails) {
        return <DashboardContent userDetails={userDetails} setUserDetails={setUserDetails} />
    }

    console.log("about to fetch");
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
                    console.log(res);
                    let body = res.json();
                    body.then((body) => {
                        setUserDetails(body);
                        console.log(body);
                    });
                }
                else {
                    return <Navigate to="/" />;
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