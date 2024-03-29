const Gred = require("../models/Gred");
const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

const blockUser = asyncHandler(async (req, res) => {
    const user = req.user;
    const id = req.get("id");
    const postObj = Post.findById(String(id)).exec();
})

const ignorePost = asyncHandler(async (req, res) => {
    const user = req.user;
    const id = req.get("id");

    const postObj = await Post.findById(String(id)).exec();
    const gredObj = await Gred.findById(String(postObj.gred)).exec();
    if (String(gredObj.user) !== user) {
        // only the owner of the gred can call this method
        return res.status(401).json({ message: "Forbidden!" });
    }
    for (let i = 0; i < gredObj.reports.length; i++) {
        if (String(gredObj.reports[i]) === String(id)) {
            // remove from the reported items
            // console.log("about to remove from gred report list");
            gredObj.reports.splice(i, 1);
            break;
        }
    }

    // console.log("about to edit post");
    postObj.reporter = "None",
    postObj.report = "",

    await postObj.save();
    await gredObj.save();

    return res.status(200).json({ gredObj });
});

const savePost = asyncHandler(async (req, res) => {
    const user = req.user;
    const id = req.get("id");
    const postObj = await Post.findById(String(id)).lean().exec();
    const userObj = await User.findById(String(user)).exec();
    userObj.savedPosts.push(String(id));
    await userObj.save();
    return res.status(200).json({ id });
});

const createPost = asyncHandler(async (req, res) => {
    const user = req.user;
    const { id, title, desc } = req.body;
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

const deletePost = asyncHandler(async (req, res) => {
    const user = req.user;
    const id = req.get("id");

    const postObj = await Post.findById(String(id)).exec();
    const gredObj = await Gred.findById(String(postObj.gred)).exec();

    if (String(gredObj.user) !== String(user)) { // if the deletion is not requested by the admin of the gred
        return res.status(401).json({ message: "Unauthorized!" });
    }

    await Post.findByIdAndDelete(id);
    for (let i = 0; i < gredObj.posts.length; i++) {
        if (String(gredObj.posts[i]) === String(id)) {
            gredObj.posts.splice(i, 1);
            console.log("deleted from the gred!");
        }
    }
    for (let i = 0; i < gredObj.reports.length; i++) {
        if (String(gredObj.reports[i]) === String(id)) {
            gredObj.reports.splice(i, 1);
            console.log("deleted from the gred!");
        }
    }
    await gredObj.save();
    return res.status(200).json({ gredObj });
})

const reportPost = asyncHandler(async (req, res) => {
    const user = req.user;
    const post = req.get("post");
    const desc = req.body.desc;
    const postObj = await Post.findById(String(post)).exec();
    const gred = await Gred.findById(String(postObj.gred)).exec();
    if (!gred.allowedUsers.includes(String(user))) {
        return res.status(403).json({ message: "Forbidden!" });
    }
    postObj.reporter = String(user);
    postObj.report = String(desc);
    gred.reports.push(post);
    await postObj.save();
    await gred.save();
    return res.status(200).json({ message: "Reported!" });
});

const upvote = asyncHandler(async (req, res) => {
    const user = req.user;
    const id = req.get("id");
    const gred = req.get("gred");

    const gredObj = await Gred.findById(String(gred)).lean().exec();

    const postObj = await Post.findById(String(id)).exec();
    if (postObj.upvotes.includes(String(user))) {
        return res.status(403).json({ gredObj, user });
    }
    postObj.upvotes.push(String(user));

    if (postObj.downvotes.includes(String(user))) {
        for (let i = 0; i < postObj.downvotes.length; i++) {
            if (postObj.downvotes[i] === String(user)) {
                postObj.downvotes.splice(i, 1);
                break;
            }
        }
    }

    await postObj.save();
    return res.status(200).json({ gredObj, user });
});

const downvote = asyncHandler(async (req, res) => {
    const user = req.user;
    const id = req.get("id");
    const gred = req.get("gred");

    const postObj = await Post.findById(String(id)).exec();

    const gredObj = await Gred.findById(String(gred)).lean().exec();

    if (postObj.downvotes.includes(String(user))) {
        return res.status(403).json({ gredObj, user });
    }
    postObj.downvotes.push(String(user));

    if (postObj.upvotes.includes(String(user))) {
        for (let i = 0; i < postObj.upvotes.length; i++) {
            if (postObj.upvotes[i] === String(user)) {
                postObj.upvotes.splice(i, 1);
                break;
            }
        }
    }


    await postObj.save();
    return res.status(200).json({ gredObj, user });
});

const unsavePost = asyncHandler(async (req, res) => {
    const user = req.user;
    const id = req.get("id");
    const postObj = await Post.findById(String(id)).lean().exec();
    const userObj = await User.findById(String(user)).exec();
    // userObj.savedPosts.push(String(id));
    for (let i = 0; i < userObj.savedPosts.length; i++) {
        if (String(userObj.savedPosts[i]) === String(id)) {
            userObj.savedPosts.splice(i, 1);
            break;
        }
    }
    await userObj.save();
    return res.status(200).json({ id });
});

module.exports = {
    createPost,
    reportPost,
    deletePost,
    ignorePost,
    savePost,
    upvote,
    downvote,
    unsavePost,
};