import { inject, injectable } from "inversify";
import { IAuthService } from "./auth.interface";
import { AuthRequest, TYPES } from "../../config/types";
import { Request, Response } from "express";
import { createUserSchema } from "../user/user.schema";
import { loginSchema } from "./auth.schema";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.IAuthService) private authService: IAuthService) { }

    async signUp(req: Request, res: Response) {
        try {
            const userData = createUserSchema.parse(req.body);
            const user = await this.authService.signUp(userData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const userData = loginSchema.parse(req.body);
            const user = await this.authService.login(userData);
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }


    async getMe(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Não autorizado" });
            }

            const user = await this.authService.getMe(req.user.id);

            res.json(user);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}