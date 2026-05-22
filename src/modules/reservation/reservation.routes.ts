import { Router } from "express";
import { authMiddleware, requireAdmin } from "../../middlewares/auth.middleware";
import { ReservationController } from "./reservation.controller";
import { container } from "../../config/container";
import { IReservationService } from "./reservation.interface";
import { TYPES } from "../../shared/types/TYPES";

const router = Router();

const reservationService = container.get<IReservationService>(TYPES.IReservationService);
const reservationController = new ReservationController(reservationService);

router.get('/', authMiddleware, reservationController.getAllReservations.bind(reservationController));
router.get('/:id', authMiddleware, reservationController.getReservationById.bind(reservationController));
router.patch('/:id/confirm', authMiddleware, requireAdmin, reservationController.confirmReservation.bind(reservationController));
router.patch('/:id/cancel', authMiddleware, reservationController.cancelReservation.bind(reservationController));

export default router;