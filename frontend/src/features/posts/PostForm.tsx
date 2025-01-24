import { ChangeEvent, FormEvent, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, TextField } from "@mui/material";
import { PostMutation } from '../../types';
import FileInput from '../../components/FileInput/FileInput.tsx';

interface Props {
  onSubmit: (post: PostMutation) => void;
}

const initialState = {
  title: "",
  description: "",
  image: null,
};

const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<PostMutation>(initialState);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form });
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            id="title"
            name="title"
            label="Title"
            required
            value={form.title}
            onChange={inputChangeHandler}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            multiline
            id="description"
            name="description"
            label="Description"
            value={form.description}
            onChange={inputChangeHandler}
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FileInput
            name="image"
            label="Image"
            onGetFile={fileChangeHandler}
          />
        </Grid>

        <Grid>
          <Button type="submit" color="primary">
            Create Post
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;
