const express = require("express")
const router = express.Router()
const postsController = require("../controllers/posts")

router.route("/")
    .get(postsController.getAllposts)
    .post(postsController.createNewPost)
    
router.route("/list")
    .post(postsController.list)
    .get(postsController.listAll);

module.exports = router;