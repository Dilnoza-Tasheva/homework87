import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, createPost, fetchPostById, addComment } from './postsThunk';
import { RootState } from "../../app/store";
import { Post } from "../../types";

interface IPostsState {
  items: Post[];
  fetchLoading: boolean;
  createLoading: boolean;
  loading: boolean;
  postDetails: Post | null;
}

const initialState: IPostsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  loading: false,
  postDetails: null,
};

export const selectPostsItems = (state: RootState) => state.posts.items;
export const selectFetchLoading = (state: RootState) => state.posts.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.posts.createLoading;
export const selectPostDetails = (state: RootState) => state.posts.postDetails;
export const selectPostLoading = (state: RootState) => state.posts.loading;

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
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.postDetails = action.payload;
      })
      .addCase(fetchPostById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.postDetails) {
          state.postDetails.comments.push(action.payload);
        }
      });
  },
});

export const postsReducer = postsSlice.reducer;
