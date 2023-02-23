const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Gred = require("../models/Gred");

const getAllUsers = asyncHandler(async (req, res) => {
    const usersList = await User.find().select("-password").lean();

    // if no user found
    if (!usersList?.length) {
        return res.status(400).json({ message: "No users found!" });
    }

    res.json(usersList);
});

const follow = asyncHandler(async (req, res) => {
    const user = req.user;
    const id = req.get("id");

    if (String(user) === String(id)) {
        return res.status(200).json({ id });
    }

    const userObj = await User.findById(String(id)).exec();
    if (userObj.followers.includes(String(user))) {
        return res.status(200).json({ id });
    }

    userObj.followers.push(String(user));

    const followerObj = await User.findById(String(user)).exec();
    followerObj.following.push(String(id));

    await followerObj.save();
    await userObj.save();

    return res.status(200).json({ userDetails: followerObj });
});


const getSaved = asyncHandler(async (req, res) => {
    const user = req.user;
    const userObj = await User.findById(String(user));
    let postIDs = new Array(userObj.savedPosts.length);
    for (let i = 0; i < userObj.savedPosts.length; i++) {
        postIDs[i] = userObj.savedPosts[i];
    }
    const postDetails = new Array(userObj.savedPosts.length);
    for (let i = 0; i < userObj.savedPosts.length; i++) {
        let postObj = await Post.findById(String(userObj.savedPosts[i])).lean().exec();
        postDetails[i] = postObj;

        const gredObj = await Gred.findById(String(postObj.gred)).lean().exec();
        postDetails[i].gredName = gredObj.title;
    }
    return res.status(200).json({ postDetails });
});

const createNewUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, username, password, email, age } = req.body;
    
    // confirm the validity of data
    if (!username || !password || !email || !firstname || !lastname || !age) {
        return res.status(400).json({ message: "Invalid username or password!" });
    }

    // check if the username is already taken
    const duplicate = await User.findOne({ username }).lean();

    if (duplicate) {
        return res.status(409).json({ message: "Username_Duplicate"});
    }

    const emailDuplicate = await User.findOne({ email }).lean();

    if (emailDuplicate) {
        return res.status(409).json({ message: "EMail_Duplicate" });
    }

    // hash the password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = { username, password: hashedPwd, email, firstname, lastname, age };

    // create and store the new user
    const user = await User.create(userObject);

    if (!user) {
        return res.status(400).json({ message: "A new user object could not be created!" });
    }

    return res.status(201).json({ message: "New user with username " + username + " created successfully!" });
});

const updateUser = asyncHandler(async (req, res) => {
    const { username, firstname, lastname, age } = req.body;
    console.log(req.body);

    // obtain the user object with the given id, along with the edit routines (hence not using lean)
    const user = await User.findById(String(req.user)).exec();
    console.log(user.username);
    if (!user) {
        return res.status(404).json({ message: "NoUser" });
    }

    if (username && user.username !== username) { // the username is being changed
        // check if the requested username is already taken
        const duplicate = await User.findOne({ username }).lean().exec();

        if (duplicate) {
            return res.status(403).json({ message: "Username_Duplicate" });
        }

        user.username = username;
    }

    if (firstname) {
        if (firstname !== user.firstname) {
            user.firstname = firstname;
        }
    }

    if (lastname) {
        if (lastname !== user.lastname) {
            user.lastname = lastname;
        }
    }

    if (age) {
        if (age !== user.age) {
            user.age = age;
        }
    }

    const updatedUser = await user.save();
    return res.status(200).json({ updatedUser });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // confirm that the id is given
    if (!id) {
        return res.status(400).json({ message: "The ID of the user must be provided!" });
    }

    const result = await User.findByIdAndDelete(id).lean().exec();

    if (!result) {
        return res.status(400).json({ message: "The user with id " + id + " could not be found!" });
    }

    return res.status(204).json({ message: "User deleted successfully!" });
});

const getOneUser = asyncHandler(async(req, res) => {
    const id = req.get("id");
    const user = await User.findById(id).lean().exec();
    if (!user) {
        return res.status(400);
    }
    return res.status(200).json({ user });
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    updateUser,
    deleteUser,
    getOneUser,
    follow,
    getSaved,
};