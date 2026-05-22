import { Types } from "mongoose";
import { AddToCartDTO, UpdateQuantityDTO } from "./cart.schema";
import { BookEntity } from "../book/book.interface";

export interface CartEntity {
    _id: Types.ObjectId;
    user: Types.ObjectId,
    items: CartItemEntity[]
}

export interface CartItemEntity {
    book: Types.ObjectId | BookEntity;
    type: "compra" | "aluguer";
    quantidade: number;
    precoUnitario: number;
}

export interface CartItemData extends AddToCartDTO {
    precoUnitario: number;
}

export interface ICartRepository {
    findByUser(userId: string): Promise<CartEntity | null>,
    addItem(userId: string, item: CartItemData): Promise<CartEntity>,
    updateItem(userId: string, bookId: string, type: "compra" | "aluguer", quantidade: number): Promise<CartEntity>,
    removeItem(userId: string, bookId: string, type: "compra" | "aluguer"): Promise<CartEntity>,
    clear(userId: string): Promise<void>
}

export interface ICartService {
    getByUser(userId: string): Promise<CartEntity | null>,
    addItem(userId: string, item: AddToCartDTO): Promise<CartEntity>,
    updateItem(userId: string, bookId: string, dto: UpdateQuantityDTO): Promise<CartEntity>
    removeItem(userId: string, bookId: string, type: "compra" | "aluguer"): Promise<CartEntity>,
    clear(userId: string): Promise<void>,
}

