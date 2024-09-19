const express = require("express");

const cinemasController = require("../controllers/cinemas-controllers");

const router = express.Router();

router.get("/", cinemasController.getAllCinemas);
router.get("/:cid", cinemasController.getCinemaById);

module.exports = router;
