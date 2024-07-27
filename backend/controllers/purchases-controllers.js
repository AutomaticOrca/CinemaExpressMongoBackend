const mongoose = require("mongoose");
const Purchase = require("../models/purchase");
const Session = require("../models/session");
const User = require("../models/user");

async function purchaseTicket(req, res) {
  const { sessionId, userId, number } = req.body;
  const session = await Session.findById(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newPurchase = new Purchase({
    sessionId: sessionId,
    userId: userId,
    number: number,
    isChecked: false,
    purchaseDate: new Date(),
  });

  try {
    await newPurchase.save();

    return res.status(201).json({
      message: "Ticket purchased successfully",
      purchase: newPurchase,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error purchasing ticket", error });
  }
}

async function getUserPurchaseHistory(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const purchases = await Purchase.find({
      userId: userId,
    });

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
