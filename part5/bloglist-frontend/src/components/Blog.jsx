import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Link as MuiLink, Box } from '@mui/material';

const Blog = ({ blogs, handleLike, handleRemove }) => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  if (!blog) return null;

  return (
    <Card sx={{ minWidth: 275, mt: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom>
          {blog.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          by {blog.author}
        </Typography>
        <MuiLink href={blog.url} target="_blank" rel="noopener">
          {blog.url}
        </MuiLink>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          Added by {blog.user ? blog.user.name : 'Unknown User'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, gap: 2 }}>
          <Typography>{blog.likes || 0} likes</Typography>
          <Button variant="outlined" color="primary" size="small" onClick={() => handleLike(blog.id)}>LIKE</Button>
          <Button variant="outlined" color="error" size="small" onClick={() => handleRemove(blog.id)}>REMOVE</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Blog;
