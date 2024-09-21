import { Router, Request, Response, NextFunction } from "express";
import {
  getNext14DaysSession,
  getNext90DaysSession,
  getSessionById,
} from "../controllers/sessions-controllers";

const router = Router();

router.get("/nowshowing", (req: Request, res: Response, next: NextFunction) => {
  getNext14DaysSession(req, res, next);
});

router.get("/comingsoon", (req: Request, res: Response, next: NextFunction) => {
  getNext90DaysSession(req, res, next);
});

router.get("/:sid", (req: Request, res: Response, next: NextFunction) => {
  getSessionById(req, res, next);
});

export default router;
