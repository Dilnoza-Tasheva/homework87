import express from 'express';
import Comment from '../models/Comment';
import auth, {RequestWithUser} from "../middleware/auth";

const commentRouter = express.Router();

commentRouter.get('/:postId', async (req, res, next) => {
    try {
        const comments = await Comment.find({post: req.params.postId})
            .populate<{ user: { username: string } }>('user', 'username')
            .exec();

        res.send(comments.map(comment => ({
            _id: comment._id,
            text: comment.text,
            author: comment.user?.username || 'Anonymous',
        })));
    } catch (e) {
        next(e);
    }
});


commentRouter.post('/', auth, async (req, res, next) => {
    try {
        const {postId, text} = req.body;
        const user = (req as RequestWithUser).user;

        const comment = new Comment({
            user: user._id,
            post: postId,
            text,
        });

        await comment.save();
        res.send(comment);
    } catch (e) {
        next(e);
    }
});

export default commentRouter;
