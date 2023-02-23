const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/")
    .post(usersController.createNewUser)
    .patch(verifyJWT, usersController.updateUser);

router.route("/oneuser")
    .get(verifyJWT, usersController.getOneUser)

router.route("/follow")
    .get(verifyJWT, usersController.follow);

router.route("/saved")
    .get(verifyJWT, usersController.getSaved);
    
module.exports = router;
