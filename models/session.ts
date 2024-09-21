import { Schema, model, Document } from "mongoose";

interface ISession extends Document {
  movieId: Schema.Types.ObjectId;
  cinemaId: Schema.Types.ObjectId;
  date: Date;
  time: number;
  price: number;
}

const sessionSchema = new Schema<ISession>(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    cinemaId: {
      type: Schema.Types.ObjectId,
      ref: "Cinema",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Session = model<ISession>("Session", sessionSchema);

export default Session;
