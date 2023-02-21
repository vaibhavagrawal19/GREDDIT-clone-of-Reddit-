const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
    const usersList = await User.find().select("-password").lean();

    // if no user found
    if (!usersList?.length) {
        return res.status(400).json({ message: "No users found!" });
    }

    res.json(usersList);
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
    const { oldusername, username, password, subGreds, savedPosts, firstname, lastname, age } = req.body;

    if (!oldusername) {
        return res.status(400).json({ message: "NoOldUsername" });
    }
    // obtain the user object with the given id, along with the edit routines (hence not using lean)
    const user = await User.find({ username: oldusername }).exec();
    if (!user) {
        return res.status(400).json({ message: "NoUser" });
    }

    if (username && user.username != username) { // the username is being changed
        // check if the requested username is already taken
        const duplicate = await User.findOne({ username }).lean().exec();

        if (duplicate) {
            return res.status(400).json({ message: "The requested username has already been taken!" });
        }

        user.username = username;
    }

    if (password) {
        const newHashedPwd = await bcrypt.hash(password, 10); // salt rounds
        user.password = newHashedPwd;
    }

    if (subGreds) {
        if (subGreds != user.subGreds) {
            user.subGreds = subGreds;
        }
    }

    if (firstname) {
        if (firstname != user.firstname) {
            user.firstname = firstname;
        }
    }

    if (lastname) {
        if (lastname != user.lastname) {
            user.lastname = lastname;
        }
    }

    if (age) {
        if (age != user.age) {
            user.age = age;
        }
    }

    if (savedPosts) {
        if (savedPosts != user.savedPosts) {
            user.savedPosts = savedPosts;
        }
    }

    const updatedUser = await user.save();
    return res.status(200).json({ message: "Updated successfully!" });
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

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};