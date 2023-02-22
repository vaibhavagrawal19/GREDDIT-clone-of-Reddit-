const mongoose = require("mongoose");

const gredSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        numFollowers: {
            type: Number,
            default: 1,
        },
        numPosts: {
            type: Number,
            default: 0,
        },
        desc: {
            type: String,
            default: "",
        },
        bannedWords: {
            type: Array,
            default: [],
        },
        tags: {
            type: Array,
            default: [],
        },
        posts: {
            type: Array,
            default: [],
        },
        allowedUsers: {
            type: Array,
            default: [],
        },
        pendingUsers: {
            type: Array,
            default: [],
        },
        blockedUsers: {
            type: Array,
            default: [],
        },
        reports: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Gred", gredSchema);