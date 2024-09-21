import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { signup, login } from "../controllers/users-controllers";

const router = Router();

router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
  signup(req, res, next);
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  login(req, res, next);
});

export default router;
