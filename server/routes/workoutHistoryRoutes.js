const express = require("express");
const router = express.Router();
const workoutHistoryController = require("../controllers/workoutHistoryController");
router.get("/", workoutHistoryController.getAllHistory);
router.post("/", workoutHistoryController.createHistory);
module.exports = router;