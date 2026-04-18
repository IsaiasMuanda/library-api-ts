import { Router } from "express";
import { UserController } from "./user.controller.ts";
import { authMiddleware, requireAdmin } from "../../middlewares/auth.middleware.ts";
import { container } from "../../config/container.ts";
import { TYPES } from "../../shared/types/TYPES.ts";
import { validate } from "../../middlewares/validate.middleware.ts";
import { updateUserSchema } from "./user.schema.ts";

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

router.get("/", authMiddleware, requireAdmin, userController.getAllUsers.bind(userController));
router.get("/:id", authMiddleware, requireAdmin, userController.getUserById.bind(userController));
router.delete("/:id", authMiddleware, requireAdmin, userController.deleteUser.bind(userController));
router.put("/:id", authMiddleware, requireAdmin, validate(updateUserSchema), userController.updateUser.bind(userController));

export default router;