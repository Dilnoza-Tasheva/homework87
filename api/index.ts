import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import mongoDb from "./mongoDb";
import postRouter from "./routers/posts";
import commentRouter from "./routers/comments";
import userRouter from "./routers/users";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/users', userRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));