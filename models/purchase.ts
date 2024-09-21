import { Schema, model, Document } from "mongoose";

interface ITicket {
  type: "NORMAL" | "DISCOUNTED";
  number: number;
  price: number;
}

interface IPurchase extends Document {
  sessionId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  tickets: ITicket[];
  status: "PENDING" | "PAID" | "CANCELLED" | "REFUNDED";
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>({
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

const purchaseSchema = new Schema<IPurchase>({
  sessionId: {
    type: Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
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

const Purchase = model<IPurchase>("Purchase", purchaseSchema);

export default Purchase;
