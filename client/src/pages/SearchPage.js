import { useState } from 'react';
import { Box, Container, TextField, Button, Alert, AlertTitle } from '@mui/material';
import DrinksCards from '../components/DrinksCards';

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

export default function SearchPage() {

    const [cocktailData, setCocktailData] = useState({});
    const [keyword, setKeyword] = useState('');
    const [foundFlag, setFoundFlag] = useState('');

    // Search functionality
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://${config.server_host}:${config.server_port}/search/${keyword}`)
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
            })
    }

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    return(
        <Box sx={styles.box}>
            <Container sx={{padding:'40px'}}>
                <h1>Find a cocktail by name</h1>
                <h4>Type a name and find drinks that matches it.</h4>

                <form onSubmit={handleSubmit}>
                    <TextField
                        id="keyword"
                        label="Type a drink here"
                        name="keyword"
                        onChange={handleKeywordChange}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-input': {
                              color: 'white'
                            },
                            '& .MuiInputLabel-root': {
                              color: 'white'
                            },
                            '& label.Mui-focused': {
                                color: 'white',
                              },
                              '& .MuiInput-underline:after': {
                                borderBottomColor: 'white',
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            }
                        }}
                        required />

                    <Container style={{textAlign: 'center'}}>
                        <Button variant="contained" type="submit">Find it!</Button>
                    </Container>
                </form>
            </Container>

            {foundFlag === 0 &&
                <Container style={{ padding: '5px 0px 5px', textAlign: 'left' }}>
                    <Alert severity="error">
                        <AlertTitle>Unable to find drinks</AlertTitle>
                        There are no drinks matching your parameters. Please try again.
                    </Alert>
                </Container>}

            {foundFlag === 1 &&
                <Container>
                    <DrinksCards data={cocktailData}></DrinksCards>
                </Container>
            }
        </Box>

    )
}