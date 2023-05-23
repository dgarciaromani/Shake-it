import { useState } from 'react';
import { Box, Container, Button, Alert, AlertTitle } from '@mui/material';
import FoodCards from '../components/FoodCards';

const config = require('../config.json');

const styles = {
    box: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.1)),
        url(${process.env.PUBLIC_URL}/background.jpg)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '0 0 10vh',
      textAlign: 'center',
      paddingBottom: '17%',
    }
};

export default function FoodPage() {

    const [foodData, setFoodData] = useState({});
    const [foundFlag, setFoundFlag] = useState('');

    const handleSavorySubmit = (event) => {
        event.preventDefault();
        fetch(`http://${config.server_host}:${config.server_port}/food/Side`)
            .then(res => res.json())
            .then(resJson => {
                if (resJson.length === undefined) {
                    setFoundFlag(0);
                    setFoodData({});
                }
                else {
                    setFoundFlag(1);
                    setFoodData(resJson);
                }
            })
    }

    const handleSweetSubmit = (event) => {
        event.preventDefault();
        fetch(`http://${config.server_host}:${config.server_port}/food/Dessert`)
            .then(res => res.json())
            .then(resJson => {
                if (resJson.length === undefined) {
                    setFoundFlag(0);
                    setFoodData({});
                }
                else {
                    setFoundFlag(1);
                    setFoodData(resJson);
                }
            })
    }

    return(
        <Box sx={styles.box}>
            <Container sx={{padding:'40px'}}>
                <h1>Pair it with food</h1>
                <h4>Explore different food options to pair with your drink.</h4>

                <form>
                    <div style={{textAlign: 'center'}}>
                    <Button variant="contained" type="submit" onClick={handleSavorySubmit}>Savory options</Button>
                    <Button variant="contained" type="submit" onClick={handleSweetSubmit}>Sweet options</Button>
                    </div>
                </form>
            </Container>

            {foundFlag === 0 &&
                <Container style={{ padding: '5px 0px 5px', textAlign: 'left' }}>
                    <Alert severity="error">
                        <AlertTitle>Unable to find food</AlertTitle>
                        There are no foods matching your parameters. Please try again.
                    </Alert>
                </Container>}

            {foundFlag === 1 &&
                <Container>
                    <FoodCards data={foodData}></FoodCards>
                </Container>
            }
        </Box>
    )
}

