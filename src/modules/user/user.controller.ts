import { inject, injectable } from "inversify";
import type { IUserService } from "./user.interface.ts";
import type { NextFunction, Request, Response } from "express";
import { TYPES } from "../../shared/types/TYPES.ts";

@injectable()
export class UserController {
    constructor(@inject(TYPES.IUserService) private userService: IUserService) { }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;

            const user = await this.userService.getUserById(id);
            res.json(user);
        } catch (error: any) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;

            await this.userService.deleteUser(id);
            res.status(204).send();
        } catch (error: any) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = req.body;
            const id = req.params.id as string;

            const user = await this.userService.updateUser(
                id,
                userData
            );

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}