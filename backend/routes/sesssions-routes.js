const express = require("express");

const sessionsController = require("../controllers/sessions-controllers");

const router = express.Router();

router.get("/nowshowing", sessionsController.getNext30DaysSession);
router.get("/comingsoon", sessionsController.getNext90DaysSession);

module.exports = router;
