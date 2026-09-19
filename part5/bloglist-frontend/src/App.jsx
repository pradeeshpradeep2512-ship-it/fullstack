import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Blog from './components/Blog';

const App = () => {
  const [user, setUser] = useState({ name: 'Matti Luukkainen', username: 'mluukkai' }); // Start logged in for easier preview
  const [blogs, setBlogs] = useState([
    { id: '1', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 4, user: { name: 'Matti Luukkainen' } },
    { id: '2', title: 'Overreacted', author: 'Dan Abramov', url: 'https://overreacted.io', likes: 2, user: { name: 'Matti Luukkainen' } },
    { id: '3', title: 'Kun MOOCit Helsingin yliopistoon tulivat', author: 'Matti Luukkainen', url: 'https://mooc.fi', likes: 10, user: { name: 'Matti Luukkainen' } }
  ]);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = (username, password) => {
    // Mock login
    if (username) {
      setUser({ name: username, username });
      navigate('/');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const createBlog = (blogObject) => {
    const newBlog = { ...blogObject, id: Math.random().toString(), likes: 0, user };
    setBlogs(blogs.concat(newBlog));
    showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    navigate('/');
  };

  const handleLike = (id) => {
    setBlogs(blogs.map(b => b.id === id ? { ...b, likes: (b.likes || 0) + 1 } : b));
  };

  const handleRemove = (id) => {
    if (window.confirm('Remove blog?')) {
      setBlogs(blogs.filter(b => b.id !== id));
      navigate('/');
    }
  };

  return (
    <Container>
      <NavBar user={user} handleLogout={handleLogout} />
      
      <Notification message={notification?.message} type={notification?.type} />

      <Routes>
        <Route path="/login" element={
          !user ? <LoginForm handleLogin={handleLogin} /> : <Navigate to="/" />
        } />
        <Route path="/create" element={
          user ? <BlogForm createBlog={createBlog} /> : <Navigate to="/login" />
        } />
        <Route path="/blogs/:id" element={
          <Blog blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} />
        } />
        <Route path="/" element={
          <div>
            <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
              blogs
            </Typography>
            <ul>
              {blogs.map(blog => (
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`} style={{ color: 'blue' }}>
                    {blog.title} by {blog.author}
                  </Link>
                </li>
              ))}
            </ul>
            {blogs.length === 0 && <p>No blogs found.</p>}
          </div>
        } />
      </Routes>
    </Container>
  );
};

export default App;
