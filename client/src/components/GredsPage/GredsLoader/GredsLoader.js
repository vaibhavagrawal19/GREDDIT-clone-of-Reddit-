import Gred from "./Gred";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export default function GredsLoader({ myGredDetails, setOpenForm }) {
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
                <Grid container spacing={4}>
                    {myGredDetails.map((gred) => (
                        <Gred key={gred._id} gred={gred} setOpenForm={setOpenForm} />
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}