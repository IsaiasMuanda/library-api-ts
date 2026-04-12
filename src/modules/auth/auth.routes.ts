import { Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRepository } from "../user/user.repository";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService)

router.post("/signup", (req: Request, res: Response) => authController.signUp(req, res));
router.post("/login", (req: Request, res: Response) => authController.login(req, res));
router.get("/me", authMiddleware, (req, res) => authController.getMe(req as any, res));

export default router;