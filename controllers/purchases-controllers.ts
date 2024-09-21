import { Request, Response } from "express";
import mongoose from "mongoose";
import Purchase from "../models/purchase";
import Session from "../models/session";
import User from "../models/user";

export const purchaseTicket = async (req: Request, res: Response) => {
  const { sessionId, userId, tickets } = req.body;

  try {
    const newPurchase = new Purchase({
      sessionId: new mongoose.Types.ObjectId(sessionId),
      userId: new mongoose.Types.ObjectId(userId),
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
      message: "Error purchasing ticket",
      error: (error as Error).message,
    });
  }
};

export const getUserPurchaseHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const purchases = await Purchase.find({ userId }).populate(
      "sessionId",
      "sessionName sessionTime"
    );

    return res.status(200).json({ purchases });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching purchase history",
      error: (error as Error).message,
    });
  }
};
