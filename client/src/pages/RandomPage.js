import { useEffect, useState } from 'react';
import { Box, Container, Grid, Button, Divider } from '@mui/material';

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
    }
};

export default function RandomPage() {

    const [cocktailData, setCocktailData] = useState({});
    const [showRecipe, setShowRecipe] = useState(false);
    const [buttonText, setButtonText] = useState("Show me the recipe");
    const ingredients = [
        cocktailData.strIngredient1,
        cocktailData.strIngredient2,
        cocktailData.strIngredient3,
        cocktailData.strIngredient4,
        cocktailData.strIngredient5,
        cocktailData.strIngredient6,
        cocktailData.strIngredient7,
        cocktailData.strIngredient8,
        cocktailData.strIngredient9,
        cocktailData.strIngredient10,
        cocktailData.strIngredient11,
        cocktailData.strIngredient12,
        cocktailData.strIngredient13,
        cocktailData.strIngredient14,
        cocktailData.strIngredient15
    ];

    useEffect(() => {
        fetch(`http://${config.server_host}:${config.server_port}/random`)
            .then(res => res.json())
            .then(resJson => setCocktailData(resJson));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://${config.server_host}:${config.server_port}/random`)
            .then(res => res.json())
            .then(resJson => {
                if (resJson.strAlcoholic === "Alcoholic") {
                  setCocktailData(resJson);
                  setShowRecipe(false);
                  setButtonText("Show me the recipe");
                } else {
                  handleSubmit(event);
                }
            });
    };

    const handleShowRecipe = () => {
        setShowRecipe(!showRecipe);
        setButtonText(showRecipe ? "Show me the recipe" : "Hide the recipe");
    };

    useEffect(() => {
        if (showRecipe) {
            setTimeout(() => {
                const recipeSection = document.getElementById('recipe-section');
                if (recipeSection) {
                    recipeSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [showRecipe]);

    return(
        <Box sx={styles.box}>
            <Container sx={{padding:'40px'}}>
                <h1>Cocktail of the day</h1>
                <Container sx={{backgroundColor: '#D3D3D3', borderRadius: '15px', width: '40%'}}>
                    <Container sx={{paddingTop:'15px', paddingBottom:'0px'}}>
                        <img src={cocktailData.strDrinkThumb} alt='Cocktail' width="300"></img>
                    </Container>
                    <Container sx={{paddingBottom:'5px'}}>
                        <h2>{cocktailData.strDrink}</h2>
                    </Container>
                </Container>
                <form onSubmit={handleSubmit}>
                    <div style={{textAlign: 'center'}}>
                        <Button variant="contained" type="submit">Find another one!</Button>
                        <Button variant="contained" onClick={handleShowRecipe}>{buttonText}</Button>
                    </div>
                </form>
            </Container>

            {showRecipe && (
                <div id="recipe-section">
                    <Container sx={{backgroundColor: '#D3D3D3', borderRadius: '15px'}}>
                        <Container sx={{padding:'10px'}}>
                            <h2>Learn here how to make your own {cocktailData.strDrink}!</h2>
                        </Container>
                        <Divider />

                        <Grid container spacing={2} columns={16}>
                            <Grid xs={8} sx={{padding:'50px'}}>
                                <img src={cocktailData.strDrinkThumb} alt='Cocktail' width="300"></img>
                            </Grid>

                            <Grid xs={8} sx={{padding:'50px'}}>
                                <Container>
                                    <h3>Ingredients:</h3>
                                    <p>
                                    {ingredients.reduce((acc, curr) => {
                                        if (curr) {
                                            acc.push(curr);
                                        }
                                        return acc;
                                        }, []).join(', ')}.
                                    </p>
                                </Container>

                                <Container>
                                    <h3>Instructions:</h3>
                                    <p>{cocktailData.strInstructions}</p>
                                </Container>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            )}

        </Box>
    )
}



