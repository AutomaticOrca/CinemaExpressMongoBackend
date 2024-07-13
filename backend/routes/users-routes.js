const express = require("express");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

router.post("/like-artist", usersController.addLikedArtist);
router.post("/like-album", usersController.addLikedAlbum);
router.post("/like-track", usersController.addLikedTrack);

module.exports = router;
