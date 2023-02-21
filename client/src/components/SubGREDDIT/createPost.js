import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { NoEncryption } from '@mui/icons-material';
import { useNavigate } from "react-router";
import Diversity2Icon from '@mui/icons-material/Diversity2';

export default function CreatePost({ currGredDetails, setOpenForm }) {
    console.log(currGredDetails);
    const [buttonEnable, setButtonEnable] = useState(true);
    const [state, setState] = useState({
        title: "",
        desc: "",
    });
    function handleSubmit(event) {
        // setButtonEnable(false);
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
                            console.log(body);
                            setButtonEnable(true);
                            setOpenForm(false);
                        })
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