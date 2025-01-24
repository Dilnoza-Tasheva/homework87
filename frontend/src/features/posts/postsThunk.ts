import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import { Post, PostMutation } from "../../types";

export const fetchPosts = createAsyncThunk<Post[], void>(
  "posts/fetchPosts",
  async () => {
    const postsResponse = await axiosApi<Post[]>("/posts");
    return postsResponse.data || [];
  }
);

export const createPost = createAsyncThunk<void, PostMutation>(
  "posts/createPost",
  async (postMutation) => {
    const formData = new FormData();

    const keys = Object.keys(postMutation) as (keyof PostMutation)[];

    keys.forEach((key) => {
      const value = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post("/posts", formData);
  }
);

export const fetchPostById = createAsyncThunk<Post, string>(
  "posts/fetchPostById",
  async (id) => {
    const postResponse = await axiosApi.get<Post>(`/posts/${id}`);
    return postResponse.data;
  }
);

export const addComment = createAsyncThunk<Comment, { postId: string; text: string }>(
  "posts/addComment",
  async ({ postId, text }) => {
    const response = await axiosApi.post<Comment>(`/posts/${postId}/comments`, { text });
    return response.data;
  }
);
