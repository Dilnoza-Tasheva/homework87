import mongoose from "mongoose";

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface Post {
    _id: string;
    title: string;
    description: string;
    image: string | null;
    author: string;
    createdAt: string;
    user: string;
    comments: mongoose.Types.ObjectId[];
}

export type PostWithoutId = Omit<Post, 'id', | 'createdAt'>

export interface Comment {
    _id: string;
    user: mongoose.Types.ObjectId | string;
    post: mongoose.Types.ObjectId | string;
    text: string;
    createdAt: string;
}

export type CommentWithoutId = Omit<Comment, 'id'>