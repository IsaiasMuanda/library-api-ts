import { inject, injectable } from "inversify";
import { IReservationRepository, IReservationService, ReservationEntity, ReservationFilters } from "./reservation.interface";
import { TYPES } from "../../shared/types/TYPES";
import { AppError } from "../../shared/errors/AppError";
import { buildPaginationMeta, buildPaginationOptions, PaginationMeta } from "../../shared/utils/pagination";
import { ICartRepository } from "../cart/cart.interface";
import { BookEntity, IBookRepository } from "../book/book.interface";
import { RENTAL_DAYS_LIMIT, RESERVATION_EXPIRE_HOURS } from "../../config/constants";
import { Types } from "mongoose";

@injectable()
export class ReservationService implements IReservationService {
    constructor(
        @inject(TYPES.IReservationRepository) private reservationRepository: IReservationRepository,
        @inject(TYPES.ICartRepository) private cartRepository: ICartRepository,
        @inject(TYPES.IBookRepository) private bookRepository: IBookRepository
    ) { }

    async checkout(userId: string): Promise<ReservationEntity> {
        const cart = await this.cartRepository.findByUser(userId);
        if (!cart) throw new AppError("Carrinho não encontrado", 404);
        if (!cart || cart.items.length === 0) throw new AppError("Carrinho vazio", 400);

        let precoTotal = 0;

        for (const item of cart.items) {
            const book = await this.bookRepository.findById(item.book.toString());

            if (!book) throw new AppError("Livro não encontrado", 404);

            const compra = item.type === "compra";
            if (compra && item.quantidade > book?.stock!) {
                throw new AppError("Quantidade indisponível")
            }

            const aluguer = item.type === "aluguer";
            if (aluguer && item.quantidade > book?.disponivelParaAluguer!) {
                throw new AppError("Quantidade indisponível")
            }

            precoTotal += item.precoUnitario * item.quantidade;
        }

        const dataHoje = new Date();
        const dataExpiracao = new Date(dataHoje.getTime() + RESERVATION_EXPIRE_HOURS * 60 * 60 * 1000);

        await Promise.all(
            cart.items.map((item) => {
                const field = item.type === "compra" ? "stock" : "disponivelParaAluguer";
                return this.bookRepository.updateStock(item.book.toString(), field, -item.quantidade);
            })
        );

        const items = cart.items.map(item => ({
            ...item,
            book: item.book instanceof Types.ObjectId
                ? item.book
                : (item.book as BookEntity)._id
        }));

        const data = {
            user: userId,
            items: items,
            precoTotal: precoTotal,
            dataExpiracao: dataExpiracao,
            status: "pendente" as const
        }

        const reserve = await this.reservationRepository.create(data);
        await this.cartRepository.clear(userId);
        return reserve;

    }

    async getById(id: string, userId: string, role: string): Promise<ReservationEntity | null> {

        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) throw new AppError("Reserva não encontrada", 404);

        if (role !== "admin" && reservation.user.toString() !== userId) throw new AppError("Acesso negado!", 403);

        return reservation;
    }

    async getAll(userId: string, role: string, filters: ReservationFilters, opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: ReservationEntity[]; meta: PaginationMeta; }> {

        if (role !== "admin") {
            filters.user = new Types.ObjectId(userId);
        }

        const { items, total } = await this.reservationRepository.findAll(filters, opts);
        const meta = buildPaginationMeta(total, opts.page, opts.limit);
        return { items, meta }
    }

    async confirm(id: string, pickUpDate: string): Promise<ReservationEntity> {

        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) throw new AppError("Reserva não encontrada", 404);
        if (reservation.status !== "pendente") {
            throw new AppError(`Não é possível confirmar uma reserva com o status: ${reservation.status}`, 400);
        }

        const pickup = new Date(pickUpDate);
        const vencimento = new Date(pickup.getTime() + RENTAL_DAYS_LIMIT * 24 * 60 * 60 * 1000);

        for (const item of reservation.items) {
            if (item.type === "aluguer") {
                item.DataVencimentoAluguel = vencimento;
            }
        }

        const newReservation = await this.reservationRepository.update(id, {
            status: "confirmado",
            dataDeConfimacao: new Date(),
            items: reservation.items
        });

        if (!newReservation) throw new AppError("Erro ao confirmar reserva", 500);
        return newReservation;
    }

    async cancel(id: string, userId: string, role: string): Promise<ReservationEntity> {

        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) throw new AppError("Reserva não encontrada", 404);

        if (role !== "admin") {
            if (reservation?.user.toString() !== userId) throw new AppError("Sem permissão", 403);
            if (reservation.status !== "pendente") {
                throw new AppError("Somente reservas pendentes podem ser canceladas", 400);
            }
        }

        await Promise.all(
            reservation.items.map((item) => {
                const field = item.type === "compra" ? "stock" : "disponivelParaAluguer";
                return this.bookRepository.updateStock(item.book.toString(), field, +item.quantidade);
            })
        );

        const newReservation = await this.reservationRepository.update(id, {
            status: "cancelado",
        });

        if (!newReservation) throw new AppError("Erro ao cancelar reserva", 500);
        return newReservation;

    }

}