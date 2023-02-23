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
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Firstname: 
            </Typography>
            <Typography component="p" variant="h4">
                {userDetails.firstname}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Lastname:
            </Typography>
            <Typography component="p" variant="h4">
            {userDetails.lastname}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Username: 
            </Typography>
            <Typography component="p" variant="h4">
                {userDetails.username}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Email: 
            </Typography>
            <Typography component="p" variant="h4">
                {userDetails.email}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Age: 
            </Typography>
            <Typography component="p" variant="h4">
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