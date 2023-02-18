import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function Gred({ gred, setOpenForm }) {
    function handleClick() {
        if (gred._id === "+") {
            setOpenForm(true);
        }
    }
    return (
        <Grid item xs={6} md={12} onClick={handleClick}>
            <CardActionArea component="a" href="#">
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

                </Card>
            </CardActionArea>
        </Grid>
    );
}

export default Gred;
