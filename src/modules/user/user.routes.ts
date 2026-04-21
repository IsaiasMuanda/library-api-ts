import { Router } from "express";
import { UserController } from "./user.controller.ts";
import { authMiddleware, requireAdmin } from "../../middlewares/auth.middleware.ts";
import { container } from "../../config/container.ts";
import { TYPES } from "../../shared/types/TYPES.ts";
import { validate } from "../../middlewares/validate.middleware.ts";
import { updateUserSchema } from "./user.schema.ts";
import { UserService } from "./user.service.ts";

const router = Router();

const userService = container.get<UserService>(TYPES.IUserService);
const userController = new UserController(userService)

router.get("/", authMiddleware, requireAdmin, userController.getAllUsers.bind(userController));
router.get("/:id", authMiddleware, requireAdmin, userController.getUserById.bind(userController));
router.delete("/:id", authMiddleware, requireAdmin, userController.deleteUser.bind(userController));
router.put("/:id", authMiddleware, requireAdmin, validate(updateUserSchema), userController.updateUser.bind(userController));

export default router;