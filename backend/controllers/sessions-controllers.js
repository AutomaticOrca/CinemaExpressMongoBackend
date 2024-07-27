const HttpError = require("../models/http-error");
const Session = require("../models/session");

const getNext14DaysSession = async (req, res) => {
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
    res.status(500).send(error.message);
  }
};

const getNext90DaysSession = async (req, res) => {
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
    res.status(500).send(error.message);
  }
};

const getSessionById = async (req, res, next) => {
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

exports.getNext14DaysSession = getNext14DaysSession;
exports.getNext90DaysSession = getNext90DaysSession;
exports.getSessionById = getSessionById;
