import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import PostList from './features/posts/PostList.tsx';
import PostDetails from './features/posts/PostDetails.tsx';
import PostForm from './features/posts/PostForm.tsx';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { selectUser } from './features/users/usersSlice.ts';
import { useEffect, useState } from 'react';
import { PostMutation } from './types';

const App = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [posts, setPosts] = useState<PostMutation[]>([]);

  const addPostHandler = (post: PostMutation) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            {user && (
              <Route path="/create" element={<PostForm onSubmit={addPostHandler}/>} />
            )}
          </Routes>
        </Container>
      </main>
    </>
  )
};

export default App;
