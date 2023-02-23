const express = require("express")
const router = express.Router()
const postsController = require("../controllers/posts")
const verifyJWT = require("../middleware/verifyJWT");

router.route("/")
    .post(verifyJWT, postsController.createPost)
    .delete(verifyJWT, postsController.deletePost);

router.route("/report")
    .post(verifyJWT, postsController.reportPost);

router.route("/ignore")
    .get(verifyJWT, postsController.ignorePost);

router.route("/upvote")
    .get(verifyJWT, postsController.upvote);

router.route("/downvote")
    .get(verifyJWT, postsController.downvote);

router.route("/save")
    .get(verifyJWT, postsController.savePost)
    .delete(verifyJWT, postsController.unsavePost);
    
module.exports = router;