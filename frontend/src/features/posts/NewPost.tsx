import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCreateLoading } from './postsSlice.ts';
import { PostMutation } from '../../types';
import { createPost } from './postsThunk.ts';
import PostForm from './PostForm.tsx';

const NewPost = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectCreateLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (post: PostMutation) => {
    try {
      await dispatch(createPost(post)).unwrap();
      navigate('/posts');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isCreateLoading ? (
        <CircularProgress />
      ) : (
        <PostForm onSubmit={onSubmitForm} />
      )}
    </>
  );
};

export default NewPost;
