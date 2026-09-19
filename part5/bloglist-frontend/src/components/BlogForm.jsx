import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
        create new
      </Typography>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <TextField
          label="title"
          variant="outlined"
          size="small"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          label="author"
          variant="outlined"
          size="small"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          label="url"
          variant="outlined"
          size="small"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Box mt={1}>
          <Button variant="contained" color="primary" type="submit">
            CREATE
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BlogForm;
