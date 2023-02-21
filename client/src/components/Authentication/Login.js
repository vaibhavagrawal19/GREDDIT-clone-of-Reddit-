import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import Diversity2Icon from '@mui/icons-material/Diversity2';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                GREDDIIT
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login({ setUserDetails, setNewUser }) {
    const [state, setState] = useState({
        username: "",
        password: "",
        errorText: "",
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.username === "") {
            setState({
                ...state,
                errorText: "Username field cannot be empty!",
            });
        }
        else if (state.password === "") {
            setState({
                ...state,
                errorText: "Password field cannot be empty!",
            });
        }
        else {
            setState({
                ...state,
                errorText: "",
            });
        }


        fetch("http://localhost:4000/auth/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: state.username, password: state.password }),
        })
            .then((res) => {
                if (res.ok) {
                    let body = res.json();
                    body.then((body) => {
                        const { refreshToken, foundUser } = body;
                        localStorage.setItem("refreshToken", refreshToken);

                        // logic to go to the profile page
                        setUserDetails(foundUser);
                    });
                }
                else {
                    // the login details were incorrect
                    let body = res.json();
                    body.then((body) => {
                        const errMsg = body.message;
                        if (errMsg === "NoUser") {
                            setState({
                                ...state,
                                errorText: "The username was not found!",
                            });
                            return;
                        }
                        else if (errMsg === "WrongPassword") {
                            setState({
                                ...state,
                                errorText: "Wrong Password!",
                            });
                            return;
                        }
                    })
                }
            })
            .catch(
                (err) => {
                    console.log(err);
                });
    }


    const handleChange = (event) => {
        event.preventDefault();
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    const newUserHandle = (event) => {
        event.preventDefault();
        setNewUser(true);
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
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
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                onChange={handleChange}
                                value={state.username}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                value={state.password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onSubmit={handleSubmit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <p style={{ color: "red" }}>
                                        {state.errorText}
                                    </p>
                                </Grid>
                                <Grid item>
                                    <Link onClick={newUserHandle} variant="body2" style={{ cursor: "pointer" }}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}