import { Router, Request, Response, NextFunction } from "express";
import {
  purchaseTicket,
  getUserPurchaseHistory,
} from "../controllers/purchases-controllers";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  purchaseTicket(req, res);
});

router.get(
  "/user/:userId",
  (req: Request, res: Response, next: NextFunction) => {
    getUserPurchaseHistory(req, res);
  }
);

export default router;
