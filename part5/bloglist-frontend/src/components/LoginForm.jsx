import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
        Log in to application
      </Typography>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' }}>
        <TextField
          label="username"
          variant="standard"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          label="password"
          type="password"
          variant="standard"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Box mt={1}>
          <Button variant="contained" color="primary" type="submit">
            LOGIN
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
