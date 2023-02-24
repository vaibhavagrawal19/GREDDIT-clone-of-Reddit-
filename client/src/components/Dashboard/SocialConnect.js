import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ListItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PeopleIcon from '@mui/icons-material/People';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";

function preventDefault(event) {
    event.preventDefault();
}

function Content({ followers, following, setFollowers, setFollowing }) {

    function unfollow(username) {
        fetch("http://localhost:4000/users/unfollow", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
                "username": username,
            },
        })
            .then(
                (res) => {
                    if (res.ok) {
                        let following_ = new Array();
                        for (let i = 0; i < following.length; i++) {
                            if (following[i] !== username) {
                                following_.push(following[i]);
                            }
                        }
                        setFollowing(following_);
                    }
                }
            )
    }

    function removeFollower(username) {
        fetch("http://localhost:4000/users/removeFollower", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
                "username": username,
            },
        })
            .then(
                (res) => {
                    if (res.ok) {
                        let followers_ = new Array();
                        for (let i = 0; i < followers.length; i++) {
                            if (followers[i] !== username) {
                                followers_.push(following[i]);
                            }
                        }
                        setFollowers(followers_);
                    }
                }
            )
    }

    // followers list
    const [open1, setOpen1] = React.useState(true);

    // following list
    const [open2, setOpen2] = React.useState(true);

    const handleClick1 = () => {
        setOpen1(!open1);
    };

    const handleClick2 = () => {
        setOpen2(!open2);
    }

    const followersList = followers.map(person =>
        <ListItem key={person}>
            <ListItemText primary={person} />
            <CancelIcon onClick={() => {
                removeFollower(person);
            }} />
        </ListItem>
    );

    const followingList = following.map(person =>
        <ListItem key={person}>
            <ListItemText primary={person} />
            <CancelIcon onClick={() => {
                unfollow(person);
            }} />
        </ListItem>
    );

    return (
        <div>
            <Title><PeopleIcon />{" "}Social Connect</Title>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton onClick={handleClick1}>
                    {/* <ListItemText primary="Followers" /> */}
                    <ListItemText><Typography component="p" variant="h4">
                        Followers:
                    </Typography></ListItemText>
                    {open1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>


                        {followersList}


                    </List>
                </Collapse>



                <ListItemButton onClick={handleClick2}>
                    {/* <ListItemText primary="Followers" /> */}
                    <ListItemText><Typography component="p" variant="h4">
                        Following:
                    </Typography></ListItemText>
                    {open2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        {followingList}


                    </List>
                </Collapse>
            </List>
        </div>
    );
}

export default function SocialConnect({ userDetails, setUserDetails }) {

    const [followers, setFollowers] = useState(false);
    const [following, setFollowing] = useState(false);

    if (followers && following) {
        return <Content followers={followers} following={following} setUserDetails={setUserDetails} setFollowers={setFollowers} setFollowing={setFollowing} />;
    }

    if (!followers) {
        fetch("http://localhost:4000/users/followers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
            },
        })
            .then(
                (res) => {
                    if (res.ok) {
                        res.json().then(
                            (body) => {
                                setFollowers(body.list);
                            }
                        )
                    }
                }
            );
    }

    if (!following) {
        fetch("http://localhost:4000/users/following", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + String(localStorage.getItem("refreshToken")),
            },
        })
            .then(
                (res) => {
                    if (res.ok) {
                        res.json().then(
                            (body) => {
                                setFollowing(body.list);
                            }
                        )
                    }
                }
            );
    }

    return (
        <div>
            Loading...
        </div>
    )
}