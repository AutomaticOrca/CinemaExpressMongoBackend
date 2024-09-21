import { Router, Request, Response, NextFunction } from "express";
import {
  getAllCinemas,
  getCinemaById,
} from "../controllers/cinemas-controllers";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  getAllCinemas(req, res, next);
});

router.get("/:cid", (req: Request, res: Response, next: NextFunction) => {
  getCinemaById(req, res, next);
});

export default router;
