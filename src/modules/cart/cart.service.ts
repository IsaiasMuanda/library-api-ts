import { inject, injectable } from "inversify";
import { TYPES } from "../../shared/types/TYPES";
import { CartEntity, ICartRepository, ICartService } from "./cart.interface";
import { AppError } from "../../shared/errors/AppError";
import { AddToCartDTO, UpdateQuantityDTO } from "./cart.schema";
import { IBookRepository } from "../book/book.interface";

@injectable()
export class CartService implements ICartService {
    constructor(@inject(TYPES.ICartRepository) private cartRepository: ICartRepository, @inject(TYPES.IBookRepository) private bookRepository: IBookRepository) { }

    async getByUser(userId: string): Promise<CartEntity | null> {
        const cart = await this.cartRepository.findByUser(userId);

        if (!cart) throw new AppError("Carrinho não encontrado", 404);
        return cart;
    }

    async addItem(userId: string, item: AddToCartDTO): Promise<CartEntity> {
        const book = await this.bookRepository.findById(item.book);
        if (!book) throw new AppError("Livro não encontrado", 404);

        if (item.type === "compra" && book.stock < item.quantidade)
            throw new AppError("Stock insuficiente", 400);
        if (item.type === "aluguer" && book.disponivelParaAluguer < item.quantidade)
            throw new AppError("Cópias insuficientes", 400);

        const precoUnitario = item.type === "compra" ? book.precoCompra : book.precoAluguer;

        const cart = await this.cartRepository.findByUser(userId);
        const existingItem = cart?.items.find(
            i => i.book.toString() === item.book && i.type === item.type
        );

        if (existingItem) {
            return this.cartRepository.updateItem(
                userId,
                item.book,
                item.type,
                existingItem.quantidade + item.quantidade
            );
        }

        return this.cartRepository.addItem(userId, { ...item, precoUnitario });
    }

    async updateItem(userId: string, bookId: string, dto: UpdateQuantityDTO): Promise<CartEntity> {
        const cart = await this.cartRepository.findByUser(userId);
        if (!cart) throw new AppError("Carrinho não encontrado", 404);

        const item = cart.items.find(i => i.book.toString() === bookId && i.type === dto.type);
        if (!item) throw new AppError("Item não encontrado no carrinho", 404);

        return this.cartRepository.updateItem(userId, bookId, dto.type, dto.quantidade);
    }

    async removeItem(userId: string, bookId: string, type: "compra" | "aluguer"): Promise<CartEntity> {
        const cart = await this.cartRepository.findByUser(userId);
        if (!cart) throw new AppError("Carrinho não encontrado", 404);

        const item = cart.items.find(i => i.book.toString() === bookId && i.type === type);
        if (!item) throw new AppError("Item não encontrado no carrinho", 404);

        return this.cartRepository.removeItem(userId, bookId, type);
    }

    async clear(userId: string) {
        await this.cartRepository.clear(userId);
    }

}