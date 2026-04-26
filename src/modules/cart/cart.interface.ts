import { Types } from "mongoose";

export interface CartEntity {
    user: Types.ObjectId,
    items: CartItemEntity[]
}

export interface CartItemEntity {
    book: Types.ObjectId,
    type: "compra" | "aluguer",
    quantidade: number,
    precoUnitario: number,
}

export interface ICartRepository {
    findByUser(userId: string): Promise<CartEntity | null>,
    addItem(userId: string, item: CartItemEntity): Promise<CartEntity>,
    updateItem(userId: string, bookId: string, type: "compra" | "aluguer", quantity: number): Promise<CartEntity>,
    removeItem(userId: string, bookId: string, type: "compra" | "aluguer"): Promise<CartEntity>,
    clear(userId: string): Promise<void>
}

export interface ICartService {
    getByUser(userId: string): Promise<CartEntity | null>,
    addItem(userId: string, item: CartItemEntity): Promise<CartEntity>,
    updateItem(userId: string, bookId: string, type: "compra" | "aluguer", quantity: number): Promise<CartEntity>,
    removeItem(userId: string, bookId: string, type: "compra" | "aluguer"): Promise<CartEntity>,
    clear(userId: string): Promise<void>,
    checkout(userId: string): Promise<unknown>
}

