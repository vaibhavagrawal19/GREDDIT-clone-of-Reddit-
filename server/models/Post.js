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
        type: Array,
        default: [],
    },
    downvotes: {
        type: Array,
        default: [],
    },
    desc: {
        type: String,
        default: "",
    },
    reporter: {
        type: String,
        default: "None",
    },
    report: {
        type: String,
        default: "",
    },
})

module.exports = mongoose.model("Post", postSchema);