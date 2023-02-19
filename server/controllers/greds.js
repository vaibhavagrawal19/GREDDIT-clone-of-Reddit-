const Gred = require("../models/Gred");
const User = require("../models/User");
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

    const gredObject = { user, title, desc, bannedWords, tags };

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
    if (!id || !user ) {
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
    if (ids === "all") {
        // fetch all the ids
        const gredsList = await Gred.find().lean().exec();
        return res.status(200).json({ gredsList });
    }
    else {
        let gredsList = new Array(ids.length);
        for (let i = 0; i < ids.length; i++) {
            let gred = await Gred.findById(ids[i]).lean().exec();
            gredsList[i] = gred;
        }
        return res.status(200).json({ gredsList });
    }
});

module.exports = {
    getAllGreds,
    createNewGred,
    deleteGred,
    list,
};