import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const NavBar = ({ user, handleLogout }) => {
  return (
    <AppBar position="static" style={{ marginBottom: '20px' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>
        <Button color="inherit" component={Link} to="/">BLOGS</Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/create">NEW BLOG</Button>
            <Button color="inherit" onClick={handleLogout}>LOGOUT</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">LOGIN</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
