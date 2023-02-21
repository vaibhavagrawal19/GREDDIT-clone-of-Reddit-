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
})

module.exports = {
    createPost,
};