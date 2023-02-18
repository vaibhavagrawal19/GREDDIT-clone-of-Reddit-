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

function preventDefault(event) {
    event.preventDefault();
}

export default function SocialConnect({ userDetails }) {
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

    const followersList = userDetails.followers.map(person =>
        <ListItem key={person.id}>
            <ListItemText primary="KevalJ" />
            <CancelIcon />
        </ListItem>
    );

    const followingList = userDetails.following.map(person => 
        <ListItem key={person.id}>
            <ListItemText primary="KevalJ" />
            <CancelIcon />
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