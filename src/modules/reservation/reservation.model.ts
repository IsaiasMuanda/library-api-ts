import mongoose, { model } from "mongoose";
import { ReservationEntity } from "./reservation.interface";

const ReservationSchema = new mongoose.Schema<ReservationEntity>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
            DataVencimentoAluguel: {
                type: Date,
            }
        }
    ],
    precoTotal: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pendente", "confirmado", "cancelado", "expirado"],
        default: "pendente",
        required: true
    },
    dataDeConfimacao: {
        type: Date
    },
    dataExpiracao: {
        type: Date
    },
}, { timestamps: true });

export const ReservationModel = model<ReservationEntity>("Reservation", ReservationSchema);