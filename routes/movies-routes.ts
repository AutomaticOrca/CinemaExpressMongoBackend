import { Router, Request, Response, NextFunction } from "express";
import { getMovieById } from "../controllers/movies-controllers";

const router = Router();

router.get("/:mid", (req: Request, res: Response, next: NextFunction) => {
  getMovieById(req, res, next);
});

export default router;
