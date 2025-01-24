import express from 'express';
import Post from '../models/Post';
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import dayjs from "dayjs";
import {Post as PostType} from "../types";

type PostDocument = PostType & Document;

const postRouter = express.Router();

postRouter.get('/', async (req, res, next) => {
    let expressReq = req as RequestWithUser
    const user = expressReq.user;
    try {
        const posts = await Post.find().sort({createdAt: -1}).populate('user', 'username').exec() as PostDocument[];
        res.send(posts.map(post => ({
            _id: post._id,
            title: post.title,
            description: post.description,
            image: post.image,
            author: user?.username || 'Anonymous',
            createdAt: dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        })));
    } catch (e) {
        next(e);
    }
});

postRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    const user = (req as RequestWithUser).user;

    try {
        const {title, description} = req.body;
        const image = req.file ? `/images/${req.file.filename}` : null;

        const post = new Post({
            title,
            description,
            image,
            user: user._id,
        });

        await post.save();
        res.send(post);
    } catch (e) {
        next(e);
    }
});
export default postRouter;
