const express = require("express");

const tracksControllers = require("../controllers/tracks-controllers");

const router = express.Router();

// router.get("/:tid", tracksControllers.);

router.get("/", tracksControllers.getTracks);

router.post("/", tracksControllers.createTrack);

module.exports = router;
