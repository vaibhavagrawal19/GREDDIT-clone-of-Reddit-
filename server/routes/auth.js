const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const loginLimiter = require("../middleware/loginLimiter");

router.route("/")
    .post(loginLimiter, authController.login);
    // the loginLimiter middleware should only be applied to this route

router.route("/refresh")
    .get(authController.refresh);

router.route("/logout")
    .post(authController.refresh);

module.exports = router;