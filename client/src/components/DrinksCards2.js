import { useState } from 'react';
import { Card, Container, CardContent, CardMedia, Typography, Box, ButtonBase, Dialog } from '@mui/material';

export default function ActionAreaCard({data}) {
    const [selectedCard, setSelectedCard] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cocktailData, setCocktailData] = useState({});
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


    const handleCardClick = (card) => {
        setSelectedCard(card);
        setDialogOpen(true);

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${card.idDrink}`)
        .then(res => res.json())
        .then(resJson => {setCocktailData(resJson.drinks[0])})
        .catch((error) => {
            console.error(error);
            return null;
        });
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '10px' }}>
                {data.map((drinks) => (
                <ButtonBase key={drinks.idDrink} onClick={() => handleCardClick(drinks)}>
                    <Card sx={{ width: 200, margin: '10px' }}>
                    <CardMedia
                        sx={{ width: '200px', height: '200px', padding: '10px', margin: 'auto' }}
                        component="img"
                        src="img"
                        height="150"
                        image={drinks.strDrinkThumb}
                        />
                        <CardContent sx={{ padding: '10px' }}>
                            <Typography gutterBottom variant="h6">
                            {drinks.strDrink}
                            </Typography>
                        </CardContent>
                    </Card>
                </ButtonBase>
                ))}
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                {selectedCard && (
                    <>
                    <Card sx={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                        <CardMedia
                            sx={{ width: '300px', height: '300px', margin: 'auto', padding: '10px' }}
                            component="img"
                            src="img"
                            height="300"
                            image={selectedCard.strDrinkThumb}
                        />

                        <CardContent sx={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography gutterBottom variant="h5">
                                {selectedCard.strDrink}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <p><b>Type:</b> {cocktailData.strAlcoholic}</p>
                                <p><b>Ingredients:</b> {ingredients.reduce((acc, curr) => {
                                    if (curr) {
                                        acc.push(curr);
                                    }
                                    return acc;
                                    }, []).join(', ')}.</p>
                                <p><b>Instructions:</b> {cocktailData.strInstructions}</p>
                            </Typography>
                        </CardContent>
                    </Card>
                    </>
                )}
                </Dialog>
            </Box>
        </Container>
    );
}