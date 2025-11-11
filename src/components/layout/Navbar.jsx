import { AppBar, Toolbar, Typography, IconButton, Button, Box, useScrollTrigger, Slide } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-scroll';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ mode, toggleColorMode }) => {
  return (
    <>
      <div id="back-to-top-anchor" />
    <HideOnScroll>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Bharath Reddy
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                component={Link}
                to={item.id}
                spy={true}
                smooth={true}
                duration={500}
                color="inherit"
                sx={{
                  '&.active': {
                    color: 'primary.main',
                    fontWeight: 'bold',
                  },
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          
          <IconButton 
            onClick={toggleColorMode} 
            color="inherit"
            aria-label="toggle theme"
            sx={{ ml: 2 }}
          >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    </>
  );
};

export default Navbar;
