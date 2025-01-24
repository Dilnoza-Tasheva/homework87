import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('posts');
        await db.dropCollection('comments');
    } catch (e) {
        console.log('Collections were not present, skipping drop');
    }

    const [user1, user2] = await User.create(
        {
            username: "Alice",
            password: "123",
            token: randomUUID(),
        },
        {
            username: "Bob",
            password: "123",
            token: randomUUID(),
        }
    );

    const [post1, post2] = await Post.create(
        {
            title: "First Post by Alice",
            description: "This is the first post by Alice.",
            image: null,
            user: user1._id,
        },
        {
            title: "Second Post by Bob",
            description: "This is the second post by Bob.",
            image: null,
            user: user2._id,
        }
    );

    await Comment.create(
        {
            user: user1._id,
            post: post1._id,
            text: "This is a comment from Alice on her post.",
        },
        {
            user: user2._id,
            post: post1._id,
            text: "This is a comment from Bob on Alice's post.",
        },
        {
            user: user1._id,
            post: post2._id,
            text: "This is a comment from Alice on Bob's post.",
        },
        {
            user: user2._id,
            post: post2._id,
            text: "This is a comment from Bob on his post.",
        }
    );

    await db.close();
};

run().catch(console.error);
