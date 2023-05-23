import { useState } from 'react';
import { Card, Container, CardContent, CardMedia, Typography, Box, ButtonBase, Dialog } from '@mui/material';

export default function ActionAreaCard({data}) {
    const [selectedCard, setSelectedCard] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
        const ingredient = selectedCard && selectedCard['strIngredient' + i];
        if (ingredient) {
          ingredients.push(ingredient);
        }
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setDialogOpen(true);
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
                                <p><b>Type:</b> {selectedCard.strAlcoholic}</p>
                                <p><b>Ingredients:</b> {ingredients.join(', ')}.</p>
                                <p><b>Instructions:</b> {selectedCard.strInstructions}</p>
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