import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, createPost } from "./postsThunk";
import { RootState } from "../../app/store";
import { Post } from "../../types";

interface IPostsState {
  items: Post[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IPostsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectPostsItems = (state: RootState) => state.posts.items;
export const selectFetchLoading = (state: RootState) => state.posts.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.posts.createLoading;

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
        state.fetchLoading = false;
        state.items = posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createPost.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const postsReducer = postsSlice.reducer;
