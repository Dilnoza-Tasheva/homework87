import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register.tsx';
import Login from './features/users/Login.tsx';
import PostList from './features/posts/PostList.tsx';

const App = () => {

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
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </main>
    </>
  )
};

export default App;
