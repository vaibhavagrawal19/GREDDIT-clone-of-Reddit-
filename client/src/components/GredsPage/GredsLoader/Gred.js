import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function handleDelete(id, user, myGredDetails, setDisableDelete, setMyGredDetails) {
    setDisableDelete(true);
    fetch("http://localhost:4000/greds/", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "id": String(id),
            "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
        },
    })
        .then(
            (res) => {
                if (res.ok) {
                    let newGredDetails = new Array();
                    for (let i = 0; i < myGredDetails.length; i++) {
                        if (myGredDetails[i]._id !== id) {
                            newGredDetails.push(myGredDetails[i]);
                        }
                    }
                    console.log(myGredDetails);
                    setMyGredDetails(newGredDetails);
                    setDisableDelete(false);
                }
            });
        }

function openPage(userDetails, gred, setCurrGredDetails, navigate) {
    setCurrGredDetails(gred._id);
    console.log(gred._id);
    navigate("/mygreds/gred");
}

function Gred({ gred, userDetails, myGredDetails, setMyGredDetails, setCurrGredDetails }) {
    const navigate = useNavigate();
    const [disableDelete, setDisableDelete] = useState(false);
    console.log("re-render");
    return (
        <Grid item xs={6} md={12}>
            <CardActionArea component="a"
                >
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }} onClick={() => {openPage(userDetails, gred, setCurrGredDetails, navigate)}}>
                        <Typography component="h2" variant="h5">
                            {gred.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {gred.date}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {gred.desc}
                        </Typography>
                    </CardContent>
                    {gred.image && <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        image={gred.image}
                        alt={gred.imageLabel}
                    />}
                    <CardContent>
                        <Button variant="contained" style={{ backgroundColor: "red" }} disabled={disableDelete} onClick={() => { handleDelete(gred._id, userDetails._id, myGredDetails, setDisableDelete, setMyGredDetails) }}>DELETE</Button>
                    </CardContent>

                </Card>
            </CardActionArea>
        </Grid>
    );
}

export default Gred;
