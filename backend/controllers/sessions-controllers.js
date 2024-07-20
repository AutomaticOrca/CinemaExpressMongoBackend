const HttpError = require("../models/http-error");
const Session = require("../models/session");

const getNext30DaysSession = async (req, res) => {
  try {
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const sessions = await Session.find({
      $expr: {
        $and: [
          { $gte: [{ $toDate: "$date" }, today] },
          { $lt: [{ $toDate: "$date" }, next30Days] },
        ],
      },
    });
    console.log(sessions);
    res.status(200).json({
      sessions: sessions.map((session) => session.toObject({ getters: true })),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getNext90DaysSession = () => {};

exports.getNext30DaysSession = getNext30DaysSession;
exports.getNext90DaysSession = getNext90DaysSession;
