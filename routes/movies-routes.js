const express = require("express");

const moviesController = require("../controllers/movies-controllers");

const router = express.Router();

router.get("/:mid", moviesController.getMovieById);

module.exports = router;
