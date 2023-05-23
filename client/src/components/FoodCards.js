import { Card, Container, CardContent, CardMedia, Typography, Box } from '@mui/material';

export default function ActionAreaCard({data}) {

    return (
        <Container>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '10px' }}>
                {data.map((meals) => (
                    <Card sx={{ width: 200, margin: '10px' }}>
                    <CardMedia
                        sx={{ width: '200px', height: '200px', padding: '10px', margin: 'auto' }}
                        component="img"
                        src="img"
                        height="150"
                        image={meals.strMealThumb}
                        />
                        <CardContent sx={{ padding: '10px' }}>
                            <Typography gutterBottom variant="h6">
                            {meals.strMeal}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}