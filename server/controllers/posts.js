const Gred = require("../models/Gred");
const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {
    const user = req.user;
    const { id, title, desc } = req.body;
    console.log(id);
    console.log(title);
    console.log()
    if (!id || !title || !desc) {
        return res.status(403).json({ message: "IncompleteInfo" });
    }
    const gred = await Gred.findById(id).exec();
    if (!gred.allowedUsers.includes(String(user))) {
        return res.status(401);
    }

    const userObj = await User.findById(user).lean().exec();
    const username = userObj.username;
    const postData = { user: req.user, title, desc, gred: id, username };

    const post = await Post.create(postData);

    if (!post) {
        return res.status(400).json({ message: "NoCreate" });
    }

    gred.posts.push(post._id);
    await gred.save();
    return res.status(201).json({ post });
});

const reportPost = asyncHandler(async (req, res) => {
    const user = req.user;
    const post = req.get("post");
    const desc = req.body.desc;
    const postObj = Post.findById(post).exec();
    const gred = Gred.findById(String(post.gred)).lean().exec();
    if (!gred.allowedUsers.include(String(user))) {
        return res.status(403).json({ message: "Forbidden!" });
    }
    post.reporter = String(user);
    post.report = String(desc);
    return res.status(200).json({ message: "Reported!" });
});

module.exports = {
    createPost,
    reportPost,
};