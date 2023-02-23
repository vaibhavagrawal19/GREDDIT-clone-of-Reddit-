const express = require("express");
const router = express.Router();
const gredsController = require("../controllers/greds");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/")
    .get(gredsController.getAllGreds)
    .post(gredsController.createNewGred)
    .delete(verifyJWT, gredsController.deleteGred);

router.route("/onegred")
    .get(verifyJWT, gredsController.getOneGred)

router.route("/leave")
    .get(gredsController.leave);

router.route("/join")
    .get(gredsController.join);

router.route("/block")
    .get(verifyJWT, gredsController.block);

router.route("/joinreqaction")
    .get(verifyJWT, gredsController.respond);
    
router.route("/list")
    .post(verifyJWT, gredsController.list)
    .get(verifyJWT, gredsController.listAll);

router.route("/reported")
    .get(verifyJWT, gredsController.getReported);
module.exports = router;