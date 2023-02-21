import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from "@mui/material";
import { useState } from "react";

function handleLeave(gred, user, allGreds, setAllGreds, setDisable) {
    setDisable(true);
    fetch("http://localhost:4000/greds/leave", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "id": String(gred._id),
            "user": String(user),
        },
    })
        .then(
            (res) => {
                if (res.ok) {
                    let finalJoinedList = new Array();
                    for (let i = 0; i < allGreds.joinedList.length; i++) {
                        if (allGreds.joinedList[i] !== gred) {
                            finalJoinedList.push(allGreds.joinedList[i]);
                        }
                    }
                    let finalBlockedList = new Array(allGreds.blockedList.length + 1);
                    for (let i = 0; i < allGreds.blockedList.length; i++) {
                        finalBlockedList[i] = allGreds.blockedList[i];
                    }
                    finalBlockedList[finalBlockedList.length - 1] = gred;
                    setAllGreds({
                        ...allGreds,
                        joinedList: finalJoinedList,
                        blockedList: finalBlockedList,
                    })
                    setDisable(false);
                }
            });

}

function handleJoin(gred, user, allGreds, setAllGreds, setDisable) {
    setDisable(true);
    fetch("http://localhost:4000/greds/join", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "id": String(gred._id),
            "user": String(user),
        },
    })
        .then(
            (res) => {
                if (res.ok) {
                    let finalOthersList = new Array();
                    for (let i = 0; i < allGreds.othersList.length; i++) {
                        if (allGreds.othersList[i] !== gred) {
                            finalOthersList.push(allGreds.othersList[i]);
                        }
                    }

                    let finalPendingList = new Array(allGreds.pendingList.length + 1);
                    for (let i = 0; i < allGreds.pendingList.length; i++) {
                        finalPendingList[i] = allGreds.pendingList[i];
                    }
                    finalPendingList[finalPendingList.length - 1] = gred;
                    setAllGreds({
                        ...allGreds,
                        pendingList: finalPendingList,
                        othersList: finalOthersList,
                    });
                    setDisable(false);
                }
            });

}

function Gred({ gred, userDetails, allGreds, setAllGreds, status }) {
    const [disable, setDisable] = useState(String(gred.user) === String(userDetails._id));
    return (
        <Grid item xs={6} md={12}>
            <CardActionArea component="a">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
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
                        {status === "joined" && <Button variant="contained" style={{ backgroundColor: "red" }} disabled={disable} onClick={() => { handleLeave(gred, userDetails._id, allGreds, setAllGreds, setDisable) }}>LEAVE</Button>}
                        {status === "pending" && <Button variant="contained" style={{ backgroundColor: "green" }} disabled={false} > PENDING...</Button>}
                    {status === "others" && <Button variant="contained" disabled={disable} onClick={() => { handleJoin(gred, userDetails._id, allGreds, setAllGreds, setDisable) }}>JOIN</Button>}
                </CardContent>

            </Card>
        </CardActionArea>
        </Grid >
    );
}

export default Gred;
