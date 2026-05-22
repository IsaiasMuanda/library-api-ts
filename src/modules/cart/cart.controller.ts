import { inject, injectable } from "inversify";
import { TYPES } from "../../shared/types/TYPES";
import { ICartService } from "./cart.interface";
import { NextFunction, Request, Response } from "express";
import { IReservationService } from "../reservation/reservation.interface";

@injectable()
export class CartController {
    constructor(
        @inject(TYPES.ICartService) private cartService: ICartService,
        @inject(TYPES.IReservationService) private reservationService: IReservationService
    ) { }

    async getCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cart = await this.cartService.getByUser(req.user?.id as string);

            res.json({ success: true, data: cart });
        } catch (error) {
            next(error)
        }
    }

    async addToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id as string;
            const item = req.body;

            const cart = await this.cartService.addItem(userId, item);
            res.status(201).json({ success: true, data: cart });

        } catch (error) {
            next(error)
        }
    }

    async updateCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id as string;
            const bookId = req.params.bookId as string;
            const item = req.body;

            const cart = await this.cartService.updateItem(userId, bookId, item);

            res.json({ success: true, data: cart });
        } catch (error) {
            next(error);
        }
    }

    async removeToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id as string;
            const bookId = req.params.bookId as string;
            const type = req.query.type as "compra" | "aluguer";

            const cart = await this.cartService.removeItem(userId, bookId, type)
            res.json({ success: true, data: cart });

        } catch (error) {
            next(error);
        }
    }

    async clearCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await this.cartService.clear(req.user?.id as string)
            res.json({ success: true, message: "Carrinho limpo" });

        } catch (error) {
            next(error);
        }
    }

    async checkOut(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user?.id as string;
            const result = await this.reservationService.checkout(userId);
            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }
}