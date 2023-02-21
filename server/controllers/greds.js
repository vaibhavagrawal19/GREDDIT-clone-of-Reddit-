const Gred = require("../models/Gred");
const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

const getAllGreds = asyncHandler(async (req, res) => {
    const gredsList = await Gred.find().lean();

    // add the creator name to each of the greds
    if (!gredsList?.length) {
        return res.status(400).json({ message: "NoGreds" });
    }

    let gredsListWithUser = new Array(gredsList.length);
    for (let i = 0; i < gredsList.length; i++) {
        let gred = gredsList[i];
        const user = await User.findById(gred.user).lean().exec();
        gred = { ...gred, username: user.username };
        gredsListWithUser[i] = gred;
    }
    res.status(200).json(gredsListWithUser);
});

const createNewGred = asyncHandler(async (req, res) => {
    const { user, title, desc, bannedWords, tags } = req.body;
    if (!user || !title) {
        return res.status(400).json({ message: "InCompleteInfo" });
    }

    const gredObject = { user, title, desc, bannedWords, tags, allowedUsers: [user] };

    const gred = await Gred.create(gredObject);

    if (!gred) {
        return res.status(400).json({ message: "NoCreate" });
    }

    const userObj = await User.findById(user).exec();
    userObj.subGreds.push(gred._id);
    await userObj.save();

    return res.status(201).json({ _id: gred._id });
});

const deleteGred = asyncHandler(async (req, res) => {
    const id = req.get("id");
    const user = req.get("user");
    if (!id || !user) {
        return res.status(400).json({ message: "InCompleteInfo" });
    }

    await Gred.findByIdAndDelete(id).lean().exec();

    const userObj = await User.findById(user).exec();
    // console.log(userObj.subGreds);
    for (let i = 0; i < userObj.subGreds.length; i++) {
        if (String(userObj.subGreds[i]._id) === id) {
            userObj.subGreds.splice(i, 1);
            break;
        }
    }

    await userObj.save();
    return res.status(204).json({ message: "Success!" });
});

const list = asyncHandler(async (req, res) => {
    const { ids } = req.body;
    let gredsList = new Array(ids.length);
    for (let i = 0; i < ids.length; i++) {
        let gred = await Gred.findById(ids[i]).lean().exec();
        gredsList[i] = gred;
    }
    return res.status(200).json({ gredsList });
});

const listAll = asyncHandler(async (req, res) => {
    const user = req.user;
    const gredsList = await Gred.find().lean();
    let joinedList = new Array();
    let othersList = new Array();
    let pendingList = new Array();
    let blockedList = new Array();
    for (let i = 0; i < gredsList.length; i++) {
        if (gredsList[i].allowedUsers.includes(String(user))) {
            joinedList.push(gredsList[i]);
        }
        else if (gredsList[i].pendingUsers.includes(String(user))) {
            pendingList.push(gredsList[i]);
        }
        else if (gredsList[i].blockedUsers.includes(String(user))) {
            blockedList.push(gredsList[i]);
        }
        else {
            othersList.push(gredsList[i]);
        }
    }
    return res.status(200).json({ joinedList, othersList, pendingList, blockedList });
});

const leave = asyncHandler(async (req, res) => {
    const id = req.get("id");
    const user = req.get("user");
    if (!id || !user) {
        return res.status(400).json({ message: "InCompleteInfo" });
    }

    let gred = await Gred.findById(id).exec();

    for (let i = 0; i < gred.allowedUsers.length; i++) {
        if (gred.allowedUsers[i] === user) {
            gred.allowedUsers.splice(i, 1);
            gred.blockedUsers.push(user);
            break;
        }
    }
    await gred.save();
    
    return res.status(204).json({ message: "Success!" });
});

const join = asyncHandler(async (req, res) => {
    const id = req.get("id");
    const user = req.get("user");
    if (!id || !user) {
        return res.status(400).json({ message: "InCompleteInfo" });
    }

    let gred = await Gred.findById(id).exec();

    gred.pendingUsers.push(user);

    await gred.save();

    return res.status(200).json({ message: "Success!" });
});

const getOneGred = asyncHandler(async (req, res) => {
    const id = req.get("id");
    console.log("gred id obtained from client: " + id);
    console.log("user id obtained from client: " + req.user);
    const user = req.user;
    const gred = await Gred.findById(id).exec();
    const postDetails = new Array();
    for (let i = 0; i < gred.posts.length; i++) {
        post = await Post.findById(gred.posts[i]);
        postDetails.push(post);
    }
    return res.status(200).json({ gred, postDetails });
});

module.exports = {
    getAllGreds,
    createNewGred,
    deleteGred,
    list,
    listAll,
    leave,
    join,
    getOneGred,
};