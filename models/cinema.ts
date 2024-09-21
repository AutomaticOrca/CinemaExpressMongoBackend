import { Schema, model, Document } from "mongoose";

interface ICinema extends Document {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

const cinemaSchema = new Schema<ICinema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cinema = model<ICinema>("Cinema", cinemaSchema);

export default Cinema;
