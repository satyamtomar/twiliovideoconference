const express = require("express");
const router = express.Router();
const roomController=require('../controllers/Room');
router.route("/joinRoom").post(roomController.joinRoom);

module.exports = router;
