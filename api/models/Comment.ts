import mongoose, {Schema} from "mongoose";
import {CommentWithoutId} from "../types";

const CommentSchema = new Schema<CommentWithoutId>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Post id is required'],
    },
    text: {
        type: String,
        required: [true, 'Text of the post is required'],
    },
}, {timestamps: true});

const Comment = mongoose.model<CommentWithoutId>('Comment', CommentSchema);
export default Comment;
