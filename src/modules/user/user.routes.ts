import { Router, type Request, type Response } from "express";
import { UserController } from "./user.controller.ts";
import { UserService } from "./user.service.ts";
import { UserRepository } from "./user.repository.ts";

const router = Router();

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService);

router.get("/", (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get("/:id", (req: Request, res: Response) => userController.getUserById(req, res));
router.delete("/:id", (req: Request, res: Response) => userController.deleteUser(req, res));
router.put("/:id", (req: Request, res: Response) => userController.updateUser(req, res));

export default router;