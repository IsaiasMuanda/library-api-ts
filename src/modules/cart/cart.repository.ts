import { injectable } from "inversify";
import { CartEntity, CartItemData, CartItemEntity, ICartRepository } from "./cart.interface";
import { CartModel } from "./cart.model";
import { AppError } from "../../shared/errors/AppError";

@injectable()
export class CartRepository implements ICartRepository {

    async findByUser(userId: string): Promise<CartEntity | null> {
        return CartModel.findOne({ user: userId }).populate("items.book", "titulo fotoCapa");
    }

    async addItem(userId: string, item: CartItemData): Promise<CartEntity> {
        const cart = await CartModel.findOneAndUpdate(
            { user: userId },
            { $push: { items: item } },
            { new: true, upsert: true },
        ).lean();

        return cart;
    }

    async updateItem(userId: string, bookId: string, type: string, quantidade: number): Promise<CartEntity> {
        const cart = await CartModel.findOneAndUpdate(
            { user: userId, 'items.book': bookId, 'items.type': type },
            { $set: { 'items.$.quantidade': quantidade } },
            { new: true },
        ).lean();

        if (!cart) throw new AppError("Item não encontrado no carrinho", 404);
        return cart;
    }

    async removeItem(userId: string, bookId: string, type: "compra" | "aluguer"): Promise<CartEntity> {
        const cart = await CartModel.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { book: bookId, type } } },
            { new: true }
        ).lean();

        if (!cart) throw new AppError("Carrinho não encontrado", 404);
        return cart;
    }

    async clear(userId: string) {
        await CartModel.findOneAndUpdate({ user: userId }, { $set: { items: [] } });
    }
}