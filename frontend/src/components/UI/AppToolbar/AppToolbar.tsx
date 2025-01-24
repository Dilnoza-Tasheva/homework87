import {AppBar, Button, styled, Toolbar, Typography} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(state => state.users.user);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Forum</Link>
        </Typography>

        {user ? (
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            Welcome, {user.username}
          </Typography>
        ) : (
          <>
            <Button component={NavLink} to="/register" color="inherit">
              Register
            </Button>
            <Button component={NavLink} to="/login" color="inherit">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;

