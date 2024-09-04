const mongoose = require("mongoose");
const Purchase = require("../models/purchase");
const Session = require("../models/session");
const User = require("../models/user");

async function purchaseTicket(req, res) {
  const { sessionId, userId, tickets } = req.body;

  try {
    const newPurchase = new Purchase({
      sessionId,
      userId,
      tickets,
      status: "PENDING",
    });

    await newPurchase.save();

    return res.status(201).json({
      message: "Ticket purchased successfully",
      purchase: newPurchase,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error purchase ticket",
      error: error.message,
    });
  }
}

async function getUserPurchaseHistory(req, res) {
  try {
    const { userId } = req.params;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user's purchases
    const purchases = await Purchase.find({ userId }).populate(
      "sessionId",
      "sessionName sessionTime"
    ); // Populating session details

    return res.status(200).json({ purchases });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching purchase history",
      error: error.message,
    });
  }
}

exports.purchaseTicket = purchaseTicket;
exports.getUserPurchaseHistory = getUserPurchaseHistory;
