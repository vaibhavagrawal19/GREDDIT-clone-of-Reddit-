const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    gred: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Gred",
    },
    upvotes: {
        type: Number,
        default: 1,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    desc: {
        type: String,
        default: "",
    },
    reporter: {
        type: String,
        default: "None",
    }
})

module.exports = mongoose.model("Post", postSchema);