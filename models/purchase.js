const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["NORMAL", "DISCOUNTED"],
  },
  number: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const purchaseSchema = new Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tickets: {
    type: [TicketSchema],
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID", "CANCELLED", "REFUNDED"],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
