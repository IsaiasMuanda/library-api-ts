import { inject, injectable } from "inversify";
import { TYPES } from "../../shared/types/TYPES";
import { IReservationService } from "./reservation.interface";
import { NextFunction, Request, Response } from "express";
import { buildPaginationOptions } from "../../shared/utils/pagination";

@injectable()
export class ReservationController {
    constructor(@inject(TYPES.IReservationService) private resevationService: IReservationService) { }

    async getAllReservations(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const opts = buildPaginationOptions(req.query);
            const id = req.user?.id as string;
            const role = req.user?.role as string;

            const filters = {
                status: req.query.status as "pendente" | "confirmado" | "cancelado" | "expirado" | undefined
            }

            const { items, meta } = await this.resevationService.getAll(id, role, filters, opts);

            res.json({ success: true, data: items, meta });

        } catch (error) {
            next(error);
        }
    }

    async getReservationById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params._id as string;
            const userId = req.user?.id as string;
            const role = req.user?.role as string;

            const item = await this.resevationService.getById(id, userId, role)

            res.json({ success: true, data: item });

        } catch (error) {
            next(error);
        }
    }

    async confirmReservation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            const pickUpDate = req.body.pickUpDate;

            const item = await this.resevationService.confirm(id, pickUpDate);

            res.json({ success: true, data: item });

        } catch (error) {
            next(error);
        }
    }

    async cancelReservation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params._id as string;
            const userId = req.user?.id as string;
            const role = req.user?.role as string;

            const item = await this.resevationService.cancel(id, userId, role)

            res.json({ success: true, data: item });

        } catch (error) {
            next(error);
        }
    }
}