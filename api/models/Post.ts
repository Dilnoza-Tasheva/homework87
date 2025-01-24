import mongoose, {Schema} from "mongoose";
import { PostWithoutId} from "../types";

const PostSchema = new Schema<PostWithoutId>({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String,
        validate: {
            validator: function (this: PostWithoutId, value: string) {
                if (!this.image && !value) return false;
                return true;
            },
            message: 'Description is required if image is not provided!',
        },
    },
    image: {
        type: String,
        default: null,
        validate: {
            validator: function (this: PostWithoutId, value: string) {
                if (!this.description && !value) return false;
                return true;
            },
            message: 'Image is required if description is not provided!',
        },
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true});

const Post = mongoose.model<PostWithoutId>('Post', PostSchema);
export default Post;
