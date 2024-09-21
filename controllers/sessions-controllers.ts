import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";
import Session from "../models/session";

export const getNext14DaysSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const next14Days = new Date();
    next14Days.setDate(today.getDate() + 14);

    const sessions = await Session.find({
      $expr: {
        $and: [
          { $gte: [{ $toDate: "$date" }, today] },
          { $lt: [{ $toDate: "$date" }, next14Days] },
        ],
      },
    });

    res.status(200).json({
      sessions: sessions.map((session) => session.toObject({ getters: true })),
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const getNext90DaysSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    const next90Days = new Date();
    next90Days.setDate(today.getDate() + 90);

    const sessions = await Session.find({
      $expr: {
        $and: [
          { $gte: [{ $toDate: "$date" }, today] },
          { $lt: [{ $toDate: "$date" }, next90Days] },
        ],
      },
    });

    res.status(200).json({
      sessions: sessions.map((session) => session.toObject({ getters: true })),
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const getSessionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionId = req.params.sid;

  let session;
  try {
    session = await Session.findById(sessionId);
  } catch (err) {
    const error = new HttpError("getSessionById failed", 500);
    return next(error);
  }

  if (!session) {
    const error = new HttpError(
      "getSessionById failed, maybe this sessionId does not exist.",
      404
    );
    return next(error);
  }

  res.json({ session: session.toObject({ getters: true }) });
};
