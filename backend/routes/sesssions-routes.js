const express = require("express");

const sessionsController = require("../controllers/sessions-controllers");

const router = express.Router();

router.get("/nowshowing", sessionsController.getNext14DaysSession);
router.get("/comingsoon", sessionsController.getNext90DaysSession);
router.get("/:sid", sessionsController.getSessionById);

module.exports = router;
