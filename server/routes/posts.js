const express = require("express")
const router = express.Router()
const postsController = require("../controllers/posts")
const verifyJWT = require("../middleware/verifyJWT");

router.route("/")
    // .get(postsController.getAllposts)
    .post(verifyJWT, postsController.createPost)
    
// router.route("/list")
    // .post(postsController.list)
    // .get(postsController.listAll);

module.exports = router;