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

export default function CreateGred({ userDetails, myGredDetails, setMyGredDetails, setOpenForm }) {
    const [buttonEnable, setButtonEnable] = useState(true);
    const [state, setState] = useState({
        name: "",
        desc: "",
        bannedWords: "",
        tags: "",
    });
    function handleSubmit(event) {
        setButtonEnable(false);
        event.preventDefault();
        let bannedWords = state.bannedWords.split(",");
        let tags = state.tags.split(",");
        fetch("http://localhost:4000/greds/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: userDetails._id,
                title: state.name,
                desc: state.desc,
                bannedWords,
                tags,
            }),
        })
            .then(
                (res) => {
                    if (res.ok) {
                        res.json().then((body) => {
                            console.log(body);
                            let myGredDetails_ = myGredDetails;
                            myGredDetails_.push({
                                _id: body._id,
                                title: state.name,
                                desc: state.desc,
                                bannedWords,
                                tags,
                            });
                            setMyGredDetails(myGredDetails_);
                            setOpenForm(false);
                            setButtonEnable(true);
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
                            Create New Sub-GREDDIIT
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                onChange={handleChange}
                                value={state.name}
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
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
                            <TextField
                                onChange={handleChange}
                                value={state.bannedWords}
                                margin="normal"
                                fullWidth
                                multiline
                                rows={5}
                                maxRows={5}
                                id="bannedWords"
                                label="Banned Keywords (comma separated list)"
                                name="bannedWords"
                                autoComplete="bannedWords"
                            />
                            <TextField
                                onChange={handleChange}
                                value={state.tags}
                                margin="normal"
                                fullWidth
                                multiline
                                rows={5}
                                maxRows={5}
                                id="tags"
                                label="Tags (comma separated list)"
                                name="tags"
                                autoComplete="tags"
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