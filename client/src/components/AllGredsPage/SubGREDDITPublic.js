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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import Avatar from '@mui/material/Avatar';

const drawerWidth = 240;

const posts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
];

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

function ReportForm({ currGredDetails, post, setReports, reports }) {
    const [state, setState] = useState({
        desc: "",
    });
    function handleChange(event) {
        event.preventDefault();
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }
    function handleSubmit(post) {
        let postIndex = currGredDetails.gred.posts.indexOf(String(post._id));
        let newReportStatus = new Array(reports.length);
        for (let i = 0; i < newReportStatus; i++) {
            newReportStatus[i] = reports[i];
        }
        newReportStatus[postIndex] = !reports[postIndex];
        setReports(newReportStatus);
        fetch("http://localhost:4000/posts/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
                "post": String(post._id),
            },
            body: JSON.stringify({
                desc: state.desc,
            }),
        })
    }
    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                onChange={handleChange}
                value={state.report}
                margin="normal"
                fullWidth
                multiline
                rows={5}
                maxRows={5}
                id="desc"
                label="Report"
                name="desc"
                autoComplete="report"
            />
            <Button
                onClick={(event) => { event.preventDefault(); handleSubmit(post) }}
                disabled={false}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                SUBMIT
            </Button>
        </Box>
    );
};

function CreatePost({ currGredDetails, setOpenForm, setCurrGredDetails }) {
    console.log(currGredDetails);
    const [buttonEnable, setButtonEnable] = useState(true);
    const [state, setState] = useState({
        title: "",
        desc: "",
    });
    function handleSubmit(event) {
        event.preventDefault();
        console.log(currGredDetails.gred._id);
        console.log(state.title);
        console.log(state.desc);
        event.preventDefault();
        fetch("http://localhost:4000/posts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
            },
            body: JSON.stringify({
                id: String(currGredDetails.gred._id),
                title: state.title,
                desc: state.desc,
            }),
        })
            .then(
                (res) => {
                    if (res.ok) {
                        res.json().then((body) => {
                            setButtonEnable(true);
                            setOpenForm(false);
                            setCurrGredDetails(currGredDetails.gred._id);
                        });
                    }
                    else {
                        console.log(res);
                        return;
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
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <Diversity2Icon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Post Something
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                onChange={handleChange}
                                value={state.name}
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                autoComplete="title"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                value={state.desc}
                                margin="normal"
                                required
                                fullWidth
                                multiline
                                rows={5}
                                maxRows={5}
                                id="desc"
                                label="Description"
                                name="desc"
                                autoComplete="desc"
                            />
                            <Button
                                disabled={!buttonEnable}
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Create!
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
    )
}

function AllPosts({ setOpenForm, currGredDetails }) {
    let reportsArr = new Array(currGredDetails.gred.posts.length).fill(false);
    const [reports, setReports] = useState(reportsArr);

    function handleReport(setReports, reports, currGredDetails, post) {
        let postIndex = currGredDetails.gred.posts.indexOf(String(post._id));
        let newReportStatus = new Array(reports.length);
        for (let i = 0; i < newReportStatus; i++) {
            newReportStatus[i] = reports[i];
        }
        newReportStatus[postIndex] = !reports[postIndex];
        setReports(newReportStatus);
    }
    return (
        < Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }
            }
        >
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
                                    <Button variant="contained" disabled={false} style={{ backgroundColor: "red" }} onClick={() => { handleReport(setReports, reports, currGredDetails, post) }}>REPORT</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    {reports[currGredDetails.gred.posts.indexOf(post._id)] === true && <ReportForm currGredDetails={currGredDetails} post={post} setReports={setReports} reports={reports} />}
                                    {reports[currGredDetails.gred.posts.indexOf(post._id)] === "submitted" && <p style={{ color: "red" }}>Report submitted successfully!</p>}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box >
    );
}

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


                        <ListItemButton onClick={() => {
                            navigate("/profile");
                        }}>
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
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Sub-GREDDITS" />
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
                {openForm === false ? <AllPosts setOpenForm={setOpenForm} currGredDetails={currGredDetails} /> : <CreatePost currGredDetails={currGredDetails} setCurrGredDetails={setCurrGredDetails} setOpenForm={setOpenForm} />}
            </Box>
        </ThemeProvider>
    );
}

export default function SubGREDDITPublic({ currGredDetails, setCurrGredDetails, setUserDetails }) {
    if (!currGredDetails) {
        return <Navigate to="/" />;
    }

    if (currGredDetails.postDetails) {
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