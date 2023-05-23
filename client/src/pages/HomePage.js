import { Container, Typography, Box, Button, Grid, } from '@mui/material';
import { Link } from 'react-router-dom';

const styles = {
  box: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.1)),
        url(${process.env.PUBLIC_URL}/homepage.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '800px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: '100px',
    fontWeight: 'bold',
    textShadow: '2px 2px #000000',
    fontFamily: 'Henny Penny',
  },
  p: {
    textAlign: 'center',
    color: 'white',
    fontSize: '20px',
    textShadow: '2px 2px #000000',
    fontFamily: 'Barlow',
  },
};

export default function HomePage() {
    return (
        <Box sx={styles.box}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography component="h1" variant="h1" sx={styles.h1}>
                        Shake it!
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Container style={{textAlign: 'center'}}>
                    <Typography component="p" variant="body1" sx={styles.p}>
                        This is a website dedicated to all things cocktail and drink-related.
                        You will be able to explore the wide variety of drink recipes and the
                        ingredients you will need to make them. Whether you're a seasoned mixologist
                        or a beginner, I have something for you. Not only do I provide an extensive
                        collection of cocktail recipes, but I also offer food pairing ideas to
                        take your drinking experience to the next level. From classic cocktails
                        to trendy new creations, I have it all. So sit back, grab a drink, and
                        let's explore the wonderful world of cocktails together!
                    </Typography>
                    </Container>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" component={Link} to="/search">
                        Search by name
                    </Button>
                    <Button variant="contained" component={Link} to="/ingredients">
                        Search by ingredient
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}