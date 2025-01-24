import React, { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";
import { fetchPosts } from './postsThunk.ts';
import Grid from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { Post } from '../../types';
import { useNavigate } from 'react-router-dom';

const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, fetchLoading} = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (fetchLoading) {
    return <CircularProgress />;
  }

  const handlePostClick = (id: string) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Grid container spacing={3}>
      {items.map((post: Post) => (
        <Grid key={post._id} size={{xs:12, sm:6, md:4}}>
          <Card onClick={() => handlePostClick(post._id)}>
            {post.image && (
              <CardMedia
                component="img"
                height="140"
                image={post.image}
                alt={post.title}
              />
            )}
            <CardContent>
              <Typography variant="h6" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Author: {post.author.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
