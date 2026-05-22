import { Types } from "mongoose";
import { buildPaginationOptions, PaginationMeta } from "../../shared/utils/pagination";

export interface ReservationItemEntity {
    book: Types.ObjectId;
    type: "compra" | "aluguer";
    quantidade: number;
    precoUnitario: number;
    DataVencimentoAluguel?: Date;
}

export interface ReservationEntity {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    items: ReservationItemEntity[];
    precoTotal: number;
    status: "pendente" | "confirmado" | "cancelado" | "expirado";
    dataDeConfimacao?: Date;
    dataExpiracao: Date;
}

export interface ReservationFilters {
    status?: "pendente" | "confirmado" | "cancelado" | "expirado";
    user?: Types.ObjectId;
}

export interface CreateReservationData {
    user: string;
    items: ReservationItemEntity[];
    precoTotal: number;
    dataExpiracao: Date;
    status: "pendente";
}

export interface IReservationRepository {
    create(data: CreateReservationData): Promise<ReservationEntity>
    findById(id: string): Promise<ReservationEntity | null>;
    findAll(filters: ReservationFilters, opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: ReservationEntity[], total: number }>
    // updateStatus(id: string, status: string): Promise<ReservationEntity | null>
    update(id: string, data: Partial<ReservationEntity>): Promise<ReservationEntity | null>
    findExpired(): Promise<ReservationEntity[]>
}

export interface IReservationService {
    checkout(userId: string): Promise<ReservationEntity>
    getById(id: string, userId: string, role: string): Promise<ReservationEntity | null>
    getAll(userId: string, role: string, filters: ReservationFilters, opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: ReservationEntity[], meta: PaginationMeta }>
    confirm(id: string, pickUpDate: string): Promise<ReservationEntity>
    cancel(id: string, userId: string, role: string): Promise<ReservationEntity>
}

