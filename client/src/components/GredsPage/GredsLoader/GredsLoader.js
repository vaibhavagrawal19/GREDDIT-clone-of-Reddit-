import Gred from "./Gred";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Button } from "@mui/material";

export default function GredsLoader({ myGredDetails, setOpenForm, userDetails, setMyGredDetails }) {
    console.log(myGredDetails);
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
                <Button variant="contained" onClick={() => {
                    setOpenForm(true);
                }}>Create New SubGREDDIIT</Button>
                </center>
            </Container>
            <Toolbar />

            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {myGredDetails.map((gred) => (
                        <Gred key={gred._id} gred={gred} setOpenForm={setOpenForm} userDetails={userDetails} myGredDetails={myGredDetails} setMyGredDetails={setMyGredDetails} />
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}