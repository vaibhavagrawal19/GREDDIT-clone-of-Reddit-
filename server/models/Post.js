const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
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
})

module.exports = mongoose.model("Post", postSchema);