import { inject, injectable } from "inversify";
import { IAuthService } from "./auth.interface";
import { NextFunction, Request, Response } from "express";
import { TYPES } from "../../shared/types/TYPES";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.IAuthService) private authService: IAuthService) { }

    async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = req.body;
            const user = await this.authService.signUp(userData);
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData = req.body;
            const user = await this.authService.login(userData);
            res.json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    }


    async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Não autorizado" });
                return;
            }

            const user = await this.authService.getMe(req.user.id);

            res.json({ success: true, data: user });
        } catch (error) {
            next(error);
        }
    }
}