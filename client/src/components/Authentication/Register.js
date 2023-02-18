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
import { NoEncryption } from '@mui/icons-material';
import { useNavigate } from "react-router";
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

export default function Login({ setNewUser }) {
    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        confirmPassword: "",
        passwordSane: true,
        age: "",
        errorText: "",
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.firstname === "") {
            setState({
                ...state,
                errorText: "Name field cannot be empty!",
            });
            return;
        }
        else if (state.lastname === "") {
            setState({
                ...state,
                errorText: "Name field cannot be empty!",
            });
            return;
        }
        else if (state.age === "") {
            setState({
                ...state,
                errorText: "Age field cannot be empty!",
            });
            return;
        }
        else if (state.username === "") {
            setState({
                ...state,
                errorText: "Username field cannot be empty!",
            });
            return;
        }
        else if (state.email === "") {
            setState({
                ...state,
                errorText: "E-Mail field cannot be empty!",
            });
            return;
        }
        else if (state.password === "") {
            setState({
                ...state,
                errorText: "Password field cannot be empty!",
            });
            return;
        }
        else if (state.confirmPassword === "") {
            setState({
                ...state,
                errorText: "Please enter the password again to confirm!",
            });
            return;
        }
        else if (state.password !== state.confirmPassword) {
            setState({
                ...state,
                errorText: "The passwords do not match!",
            });
            return;
        }
        else {
            setState({
                ...state,
                errorText: "",
            });
        }

        // send the data to the backend
        fetch("http://localhost:4000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: state.firstname,
                lastname: state.lastname,
                username: state.username,
                password: state.password,
                age: state.age,
                email: state.email
            }),
        })
            .then(
                (res) => {
                    if (res.ok) {
                        setState({
                            firstname: "",
                            lastname: "",
                            age: "",
                            username: "",
                            password: "",
                            email: "",
                            confirmPassword: "",
                            passwordSane: true,
                            errorText: "",
                        });
                        setNewUser(false);
                        return;
                    }
                    else {
                        let body = res.json();
                        body.then((body) => {
                            let errMsg = body.message;
                            console.log(errMsg);
                            if (errMsg === "Username_Duplicate") {
                                setState({
                                    ...state,
                                    username: "",
                                    errorText: "The username is already taken!",
                                });
                            }
                            else if (errMsg === "EMail_Duplicate") {
                                setState({
                                    ...state,
                                    email: "",
                                    errorText: "The email is already registered!",
                                });
                            }
                        });
                    }
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                });
    };

    const handleChange = (event) => {
        event.preventDefault();
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    const newUserHandle = (event) => {
        event.preventDefault();
        setNewUser(false);
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
                            Register
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                                onChange={handleChange}
                                value={state.firstname}
                                margin="normal"
                                required
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
                                required
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
                                required
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
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                            />
                            <TextField
                                onChange={handleChange}
                                value={state.email}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-Mail Address"
                                name="email"
                                autoComplete="email"
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
                            <TextField
                                onChange={handleChange}
                                value={state.confirmPassword}
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <p style={{ color: "red" }}>
                                        {state.errorText}
                                    </p>
                                </Grid>
                                <Grid item>
                                    <Link onClick={newUserHandle} variant="body2" style={{ cursor: "pointer" }}>
                                        {"Already a GREDDIIT User? Sign In!"}
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