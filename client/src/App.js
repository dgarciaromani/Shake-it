import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from "@mui/material/styles";
import './App.css';

import NavBar from './components/NavBar';
import StickyFooter from './components/StickyFooter';
import HomePage from './pages/HomePage';
import RandomPage from './pages/RandomPage';
import SearchPage from './pages/SearchPage';
import IngredientsPage from './pages/IngredientsPage';
import FoodPage from './pages/FoodPage';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#263238',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          margin: '10px',
          backgroundColor: '#ff7961',
          textTransform: 'none',
          fontFamily: 'Barlow',
          fontWeight: 'bold',
          width: '200px',
          height: '50px',
        },
      },
    },
  },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/random" element={<RandomPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/food" element={<FoodPage />} />
        </Routes>
      </BrowserRouter>
      <StickyFooter />
    </ThemeProvider>
  );
}

export default App;
