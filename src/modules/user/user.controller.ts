import { inject, injectable } from "inversify";
import type { IUserService } from "./user.interface.ts";
import type { Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "./user.schema.ts";
import { TYPES } from "../../config/types.ts";

@injectable()
export class UserController {
    constructor(@inject(TYPES.IUserService) private userService: IUserService) { }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = createUserSchema.parse(req.body);

            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;

            const user = await this.userService.getUserById(id);
            res.json(user);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id as string;

            await this.userService.deleteUser(id);
            res.status(204).send();

        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userData = updateUserSchema.parse(req.body);
            const id = req.params.id as string;

            const user = await this.userService.updateUser(
                id,
                userData
            );

            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}