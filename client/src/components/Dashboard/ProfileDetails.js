import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import CreateIcon from '@mui/icons-material/Create';

function preventDefault(event) {
    event.preventDefault();
}

export default function ProfileDetails({ userDetails }) {
    function editProfile() {
        // render the form for updating the details
    }
    return (
        <div>
            <Title><CreateIcon onClick={editProfile} style={{cursor: "pointer"}}></CreateIcon>{' '}Profile Details</Title>
            <Typography component="p" variant="h4">
                First Name:
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {userDetails.firstname}
            </Typography>
            <Typography component="p" variant="h4">
                Last Name:
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {userDetails.lastname}
            </Typography>
            <Typography component="p" variant="h4">
                Username:
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {userDetails.username}
            </Typography>
            <Typography component="p" variant="h4">
                Age:
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {userDetails.age}
            </Typography>
            {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
        </div>
    );
}