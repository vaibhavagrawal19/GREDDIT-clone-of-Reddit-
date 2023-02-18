const express = require("express")
const router = express.Router()
const gredsController = require("../controllers/greds")

router.route("/")
    .get(gredsController.getAllGreds)
    .post(gredsController.createNewGred);
    // .patch(gredsController.updateGred)
    // .delete(gredsController.deleteGred);

router.route("/list")
    .post(gredsController.list);

module.exports = router;