import { Request, Response } from "express";
import mongoose from "mongoose";
import Purchase from "../models/purchase";
import Session from "../models/session";
import User from "../models/user";

export const purchaseTicket = async (req: Request, res: Response) => {
  const { sessionId, userId, tickets } = req.body;

  // Check for required fields
  if (
    !sessionId ||
    !userId ||
    !tickets ||
    !Array.isArray(tickets) ||
    tickets.length === 0
  ) {
    return res.status(400).json({ message: "Missing or invalid input data" });
  }

  try {
    // Verify if sessionId exists
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Verify if userId exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate each entry in the tickets array
    const validTicketTypes = ["NORMAL", "DISCOUNTED"];
    for (const ticket of tickets) {
      if (!ticket.type || !validTicketTypes.includes(ticket.type)) {
        return res
          .status(400)
          .json({ message: `Invalid ticket type: ${ticket.type}` });
      }
      if (
        !ticket.number ||
        ticket.number <= 0 ||
        !ticket.price ||
        ticket.price <= 0
      ) {
        return res
          .status(400)
          .json({
            message: `Invalid ticket details: ${JSON.stringify(ticket)}`,
          });
      }
    }

    // Create a new purchase record
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
