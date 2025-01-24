import Grid from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectPostDetails, selectPostLoading } from './postsSlice.ts';
import Placeholder from "../../../assets/placeholder.svg";
import { addComment, fetchPostById } from './postsThunk.ts';
import { apiUrl } from '../../globalConstants.ts';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPostDetails);
  const isLoading = useAppSelector(selectPostLoading);
  const user = useAppSelector((state) => state.users.user);

  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  const submitCommentHandler = async () => {
    if (comment.trim() && id) {
      await dispatch(addComment({ postId: id, text: comment }));
      setComment("");
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography variant="h6">Post not found</Typography>;
  }

  const postImage = post.image ? `${apiUrl}/${post.image}` : Placeholder;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardHeader title={post.title} />
          <CardMedia
            style={{ width: "100%" }}
            component="img"
            image={postImage}
            title={post.title}
          />
          <CardContent>
            <Typography variant="body1">{post.description}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="h5">Comments</Typography>
        {post.comments.length === 0 ? (
          <Typography>No comments yet</Typography>
        ) : (
          post.comments.map((comment, index) => (
            <Card key={index} style={{ marginBottom: "10px" }}>
              <CardContent>
                <Typography variant="body2">{comment.text}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Grid>

      <Grid size={{ xs: 12 }}>
        {user ? (
          <>
            <TextField
              label="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={submitCommentHandler}
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </>
        ) : (
          <Typography variant="body2" color="textSecondary">
            Please log in to add a comment.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default PostDetails;
