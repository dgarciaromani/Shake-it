import { useEffect, useState } from 'react';
import { Box, Container, InputLabel, MenuItem, Select, FormControl, Button, Alert, AlertTitle  } from '@mui/material';
import DrinksCards2 from '../components/DrinksCards2';

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
      paddingBottom: '15%',
    },
};

export default function IngredientsPage() {
    const [cocktailData, setCocktailData] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [foundFlag, setFoundFlag] = useState('');

    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`)
        .then(res => res.json())
        .then(resJson => {
            const sortedIngredients = resJson.drinks.sort((a, b) => a.strIngredient1.localeCompare(b.strIngredient1));
            setIngredients(sortedIngredients);
        });
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://${config.server_host}:${config.server_port}/ingredients/${keyword}`)
            .then(res => res.json())
            .then(resJson => {
                if (resJson.length === undefined) {
                    setFoundFlag(0);
                    setCocktailData({});
                }
                else {
                    setFoundFlag(1);
                    setCocktailData(resJson);
                }
        });

    }

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    useEffect(() => {
        if (foundFlag === 1) {
            setTimeout(() => {
                const drinksSection = document.getElementById('drinks-section');
                if (drinksSection) {
                    drinksSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [foundFlag]);

    return (
        <Box sx={styles.box}>
            <Container sx={{padding:'40px'}}>
                <h1>Find a cocktail by ingredient</h1>
                <h4>Select an ingredient from the list and find drinks that contains it.</h4>

                <Container>
                    <img src={`https://www.thecocktaildb.com/images/ingredients/${keyword}-Medium.png`} alt={`${keyword}`}></img>
                </Container>

                <form onSubmit={handleSubmit}>
                <FormControl>
                    <Container style={{textAlign: 'center'}}>
                        <InputLabel id="ingredients-label" sx={{ color: 'white', display: 'block', marginLeft: '35px', textAlign: 'center' }}>
                            Pick an ingredient</InputLabel>
                        <Select
                            id="ingredient"
                            label="Pick an ingredient"
                            labelId="ingredients-label"
                            onChange={handleKeywordChange}
                            sx={{ width: '200px', textAlign: 'left', color: 'white',
                                '& .MuiSelect-icon': {
                                    color: 'white',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white'
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white'
                                },

                                ".MuiSelect-outlined":{
                                    color: 'white'
                                },

                                }}>
                            {ingredients.map((ingredient, index) => (
                                <MenuItem key={index} value={ingredient.strIngredient1}>
                                    {ingredient.strIngredient1}
                                </MenuItem>
                            ))}
                        </Select>
                    </Container>


                    <Container style={{textAlign: 'center'}}>
                        <Button variant="contained" type="submit">Find it!</Button>
                    </Container>
                </FormControl>
                </form>
            </Container>


            {foundFlag === 0 &&
                <Container style={{ padding: '5px 0px 5px', textAlign: 'left' }}>
                    <Alert severity="error">
                        <AlertTitle>Unable to find drinks</AlertTitle>
                        There are no drinks matching your parameters. Please try again.
                    </Alert>
                </Container>}


            <div id="drinks-section">
            {foundFlag === 1 &&
                <Container>
                    <DrinksCards2 data={cocktailData}></DrinksCards2>
                </Container>
            }
            </div>
        </Box>
    );
}