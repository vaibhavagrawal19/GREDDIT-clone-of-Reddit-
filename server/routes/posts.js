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
    
module.exports = router;