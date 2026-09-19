import { Alert } from '@mui/material';

const Notification = ({ message, type = 'success' }) => {
  if (!message) return null;
  
  return (
    <Alert severity={type} style={{ marginBottom: '20px' }}>
      {message}
    </Alert>
  );
};

export default Notification;
