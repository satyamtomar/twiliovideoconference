const express = require("express");
const router = express.Router();
const roomController=require('../controllers/Room');
const videoController=require('../controllers/Video');

router.route("/joinRoom").post(roomController.joinRoom);
router.route("/getRoomToken").post(videoController.getRoomToken);

module.exports = router;
