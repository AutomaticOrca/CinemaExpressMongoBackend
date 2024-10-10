const mongoose = require("mongoose");
const Purchase = require("../models/purchase");
const Session = require("../models/session");
const Movie = require("../models/movie");
const Cinema = require("../models/cinema");
const User = require("../models/user");

// Helper function to calculate end time
function calculateEndTime(startTime, runtime) {
  const startHour = Math.floor(startTime);
  const startMinute = (startTime - startHour) * 60;

  const startDate = new Date();
  startDate.setHours(startHour);
  startDate.setMinutes(startMinute);
  startDate.setSeconds(0);

  const endDate = new Date(startDate.getTime() + runtime * 60000); // runtime is in minutes
  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes().toString().padStart(2, "0"); // Add leading zero if needed

  return `${endHour}:${endMinute}`;
}

// Helper function to convert 24-hour time to 12-hour format with AM/PM
function convertTo12HourFormat(timeIn24) {
  let hours = Math.floor(timeIn24);
  let minutes = (timeIn24 - hours) * 60;

  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert hour 0 to 12 for 12-hour format
  minutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if minutes < 10

  return `${hours}:${minutes} ${period}`;
}

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

async function fetchPurchaseById(req, res) {
  try {
    const { purchaseId } = req.params;

    const purchase = await Purchase.findById(purchaseId)
      .populate("sessionId", "movieId cinemaId date time")
      .populate("userId", "name email");

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    const session = await Session.findById(purchase.sessionId);
    const movie = await Movie.findById(session.movieId);
    const cinema = await Cinema.findById(session.cinemaId);

    // Calculate movie duration and session end time
    const movieDuration = `${Math.floor(movie.runtime / 60)} hrs ${
      movie.runtime % 60
    } mins`;
    const sessionEndTime = calculateEndTime(session.time, movie.runtime);

    // Convert sessionTime to 12-hour format with AM/PM
    const sessionTime = convertTo12HourFormat(session.time);

    // Return the enhanced data
    return res.status(200).json({
      purchaseId: purchase._id,
      sessionDate: session.date,
      sessionTime: sessionTime,
      sessionEndTime: sessionEndTime,
      movieName: movie.title,
      movieImg: movie.poster,
      movieDuration: movieDuration,
      cinemaName: cinema.name,
      userName: purchase.userId.name,
      userEmail: purchase.userId.email,
      tickets: purchase.tickets,
      status: purchase.status,
      createdAt: purchase.createdAt,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching purchase",
      error: error.message,
    });
  }
}
exports.purchaseTicket = purchaseTicket;
exports.getUserPurchaseHistory = getUserPurchaseHistory;
exports.fetchPurchaseById = fetchPurchaseById;
