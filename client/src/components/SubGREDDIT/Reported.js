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
import { useNavigate, Navigate } from "react-router-dom";
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
    const deleteBtnsFalse = new Array(currGredDetails.reportedList.length).fill(false);
    const blockBtnsFalse = new Array(currGredDetails.reportedList.length).fill(false);
    const ignoreBtnsFalse = new Array(currGredDetails.reportedList.length).fill(false);

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [openForm, setOpenForm] = useState(false);

    const [ignoreBtns, setIgnoreBtns] = useState(ignoreBtnsFalse);
    const [blockBtns, setBlockBtns] = useState(blockBtnsFalse);
    const [deleteBtns, setDeleteBtns] = useState(deleteBtnsFalse);

    function handleBlock(report) {
        fetch("http://localhost:4000/greds/block", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
                "id": String(report.post.gred),
                "toBlock": String(report.post.user),
            },
        })
            .then(
                (res) => {
                    let currGredDetails_ = { ...currGredDetails };
                    if (res.ok) {
                        console.log("here");
                        for (let i = 0; i < currGredDetails_.reportedList.length; i++) {
                            if (currGredDetails_.reportedList[i] === report) {
                                console.log("about to remove from frontend!");
                                currGredDetails_.reportedList.splice(i, 1);
                                break;
                            }
                        }
                        res.json().then(
                            (body) => {
                                currGredDetails_.gred = body.gredObj;
                                setCurrGredDetails(currGredDetails_);
                            }
                        )
                    }
                }
            )
    }

    function handleIgnore(report, currGredDetails) {
        console.log("came here!");
        fetch("http://localhost:4000/posts/ignore", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
                "id": String(report.post._id),
            },
        })
            .then(
                (res) => {
                    let currGredDetails_ = { ...currGredDetails };
                    if (res.ok) {
                        console.log("here");
                        for (let i = 0; i < currGredDetails_.reportedList.length; i++) {
                            if (currGredDetails_.reportedList[i] === report) {
                                console.log("about to remove from frontend!");
                                currGredDetails_.reportedList.splice(i, 1);
                                break;
                            }
                        }
                        res.json().then(
                            (body) => {
                                currGredDetails_.gred = body.gredObj;
                                setCurrGredDetails(currGredDetails_);
                            }
                        )
                    }
                }
            );
    }


    function handleDelete(report, currGredDetails) {
        fetch("http://localhost:4000/posts", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
                "id": String(report.post._id),
            },
        })
            .then(
                (res) => {
                    let currGredDetails_ = { ...currGredDetails };
                    console.log("here");
                    if (res.ok) {
                        for (let i = 0; i < currGredDetails_.reportedList.length; i++) {
                            if (currGredDetails_.reportedList[i] === report) {
                                currGredDetails_.reportedList.splice(i, 1);
                                break;
                            }
                        }
                        res.json().then(
                            (body) => {
                                currGredDetails_.gred = body.gredObj;
                                setCurrGredDetails(currGredDetails_);
                            }
                        )
                    }
                }
            );
    }

    console.log(currGredDetails.reportedList);

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
                            navigate("/mygreds/gred/users");
                        }}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItemButton>
                        <ListItemButton onClick={() => {
                            navigate("/mygreds/gred/joinReq");
                        }}>
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


                    <Toolbar />
                    <Toolbar />
                    <Toolbar />
                    <Container maxWidth="lg">
                        <Grid container spacing={4}>
                            {currGredDetails.gred.reports.length > 0 && currGredDetails.reportedList.map((report) => (
                                <Grid item xs={6} md={12}>
                                    <Card sx={{ display: 'flex' }}>
                                        <CardContent sx={{ flex: 1 }}>
                                            <Typography component="h2" variant="h5">
                                                {report.post.title}
                                            </Typography>
                                            <Typography component="h2" variant="subtitle1">
                                                {report.post.desc}
                                            </Typography>
                                            <Toolbar />
                                            <Typography style={{ color: "red" }} component="h2" variant="h6">
                                                Report:
                                            </Typography>
                                            <Typography style={{ color: "red" }} component="h2" variant="body2">
                                                {report.post.report}
                                            </Typography>
                                        </CardContent>
                                        <CardContent>
                                            <Typography component="h2" variant="subtitle1">
                                                Reported by: {report.whoReported.username}
                                            </Typography>
                                            <Typography component="h2" variant="subtitle1">
                                                Post by: {report.post.username}
                                            </Typography>
                                            <Toolbar />
                                            <Button onClick={
                                                (event) => {
                                                    event.target.disabled = true;
                                                    event.preventDefault();
                                                    console.log("here");
                                                    handleDelete(report, currGredDetails);
                                                    event.target.disabled = false;
                                                }
                                            } style={{ backgroundColor: "red" }} variant="contained" disabled={deleteBtns[currGredDetails.reportedList.indexOf(report)]}>DELETE POST</Button>
                                            <Button onClick={
                                                (event) => {
                                                    event.preventDefault();
                                                    console.log("here");
                                                    handleIgnore(report, currGredDetails);
                                                }} variant="contained" disabled={false}>IGNORE</Button>
                                            <Button onClick={
                                                (event) => {
                                                    let newBlockBtns = blockBtns;
                                                    newBlockBtns[currGredDetails.reportedList.indexOf(report)] = true;
                                                    setBlockBtns(newBlockBtns);
                                                    event.preventDefault();
                                                    handleBlock(report);
                                                }
                                            } style={{ backgroundColor: "red" }} variant="contained" disabled={blockBtns[currGredDetails.reportedList.indexOf(report)]}>BLOCK USER</Button>

                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>

                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Reported({ currGredDetails, setCurrGredDetails }) {
    if (!currGredDetails) {
        return <Navigate to="/" />;
    }

    if (currGredDetails.reportedList) {
        return <Content currGredDetails={currGredDetails} setCurrGredDetails={setCurrGredDetails} />
    }

    let reportedList = new Array(currGredDetails.gred.reports.length);
    fetch("http://localhost:4000/greds/reported", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
            "id": String(currGredDetails.gred._id),
        },

    })
        .then(
            (res) => {
                if (res.ok) {
                    res.json().then(
                        (body) => {
                            reportedList = body.reports;
                            setCurrGredDetails({
                                ...currGredDetails,
                                reportedList,
                            })
                        }
                    )
                }
            }
        )

    return <div>Loading...</div>;
}