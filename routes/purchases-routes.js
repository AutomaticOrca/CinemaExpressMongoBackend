const express = require("express");
const purchasesController = require("../controllers/purchases-controllers");

const router = express.Router();

router.post("/", purchasesController.purchaseTicket);
router.get("/user/:userId", purchasesController.getUserPurchaseHistory);

module.exports = router;
