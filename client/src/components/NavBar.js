import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';

const NavText = ({ href, text, isMain }) => {
  return (
    <Typography
      variant={isMain ? 'h5' : 'h7'}
      noWrap
      style={{
        marginRight: '60px',
        fontWeight: 700,
        fontFamily: isMain ? "Henny Penny, cursive" : "'Barlow', sans-serif"
      }}>
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}>
        {text}
      </NavLink>
    </Typography>
  )
}

export default function NavBar() {
  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <NavText href='/' text="Shake it!" isMain />
          <NavText href='/random' text='Cocktail of the day' />
          <NavText href='/search' text='Search by name' />
          <NavText href='/ingredients' text='Search by ingredient' />
          <NavText href='/food' text='Pair it with food' />
        </Toolbar>
      </Container>
    </AppBar>
  );
}