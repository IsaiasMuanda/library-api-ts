import mongoose, { model } from "mongoose";
import { CartEntity } from "./cart.interface";

const CartSchema = new mongoose.Schema<CartEntity>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true
            },
            type: {
                type: String,
                enum: ["compra", "aluguer"],
                required: true
            },
            quantidade: {
                type: Number,
                required: true,
                min: 1,
            },
            precoUnitario: {
                type: Number,
                required: true,
                min: 0,
            },
        }
    ]
}, { timestamps: true });

export const CartModel = model<CartEntity>("Cart", CartSchema)