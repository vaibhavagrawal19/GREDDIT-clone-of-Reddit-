import Gred from "./Gred";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Button, Typography } from "@mui/material";

export default function GredsLoader({ userDetails, allGreds, setAllGreds, setUserDetails, setCurrGredDetails }) {
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

            <Container>
                <center>
                    <Typography>Joined Sub-GREDDITS</Typography>
                </center>
            </Container>

            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {allGreds.joinedList.map((gred) => (
                        <Gred key={gred._id} gred={gred} userDetails={userDetails} setUserDetails={setUserDetails} allGreds={allGreds} setAllGreds={setAllGreds} setCurrGredDetails={setCurrGredDetails} status="joined" />
                    ))}
                </Grid>
            </Container>
            <Toolbar />

            <Container>
                <center>
                    <Typography>Pending Join Requests</Typography>
                </center>
            </Container>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {allGreds.pendingList.map((gred) => (
                        <Gred key={gred._id} gred={gred} userDetails={userDetails} setUserDetails={setUserDetails} allGreds={allGreds} setAllGreds={setAllGreds} setCurrGredDetails={setCurrGredDetails} status="pending" />
                    ))}
                </Grid>
            </Container>
            <Toolbar />

            <Container>
                <center>
                    <Typography>Other Sub-GREDDITS</Typography>
                </center>
            </Container>

            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {allGreds.othersList.map((gred) => (
                        <Gred key={gred._id} gred={gred} userDetails={userDetails} setUserDetails={setUserDetails} allGreds={allGreds} setAllGreds={setAllGreds} setCurrGredDetails={setCurrGredDetails} status="others" />
                    ))}
                </Grid>
            </Container>
            <Toolbar />

            <Container>
                <center>
                    <Typography>Blocked</Typography>
                </center>
            </Container>

            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {allGreds.blockedList.map((gred) => (
                        <Gred key={gred._id} gred={gred} userDetails={userDetails} setUserDetails={setUserDetails} allGreds={allGreds} setAllGreds={setAllGreds} setCurrGredDetails={setCurrGredDetails} status="blocked" />
                    ))}
                </Grid>
            </Container>
            <Toolbar />
        </Box>
    )
}