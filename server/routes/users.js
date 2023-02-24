const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/")
    .post(usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser);

router.route("/oneuser")
    .get(verifyJWT, usersController.getOneUser);

router.route("/followers")
    .get(verifyJWT, usersController.fetchFollowerNames);

router.route("/following")
    .get(verifyJWT, usersController.fetchFollowingNames);

router.route("/follow")
    .get(verifyJWT, usersController.follow);

router.route("/unfollow")
    .get(verifyJWT, usersController.unfollow);

router.route("/removeFollower")
    .get(verifyJWT, usersController.removeFollower);

router.route("/saved")
    .get(verifyJWT, usersController.getSaved);

module.exports = router;
