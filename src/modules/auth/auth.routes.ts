import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { container } from "../../config/container";
import { validate } from "../../middlewares/validate.middleware";
import { createUserSchema } from "../user/user.schema";
import { loginSchema } from "./auth.schema";
import { TYPES } from "../../shared/types/TYPES";
import { IAuthService } from "./auth.interface";
import { authRateLimiter } from "../../middlewares/rateLimit.middleware";

const router = Router();
const authService = container.get<IAuthService>(TYPES.IAuthService)
const authController = new AuthController(authService);

router.post("/signup", validate(createUserSchema), authController.signUp.bind(authController));
router.post("/login",authRateLimiter, validate(loginSchema), authController.login.bind(authController));
router.get("/me", authMiddleware, authController.getMe.bind(authController));

export default router;