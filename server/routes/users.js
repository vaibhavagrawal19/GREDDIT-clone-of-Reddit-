const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/")
    .post(usersController.createNewUser);

module.exports = router;
