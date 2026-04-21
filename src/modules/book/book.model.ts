import mongoose, { model, ObjectId } from "mongoose";


export interface BookEntity {
    _id: ObjectId;
    titulo: string;
    isbn: string;
    author: ObjectId;
    genero: string;
    anoPublicacao: number;
    descricao: string;
    fotoCapa: string;
    precoCompra: number;
    precoAluguer: number;
    stock: number;
    totalParaAluguer: number;
    disponivelParaAluguer: number;
}

const BookSchema = new mongoose.Schema<BookEntity>({
    titulo: {
        type: String,
        trim: true,
        required: true,
        maxLength: [100, "Excedeu o limite de caracteres"]
    },
    isbn: {
        type: String,
        unique: true,
        required: true,
        minLength: [10, "ISBN deve ter pelo menos 10 caracteres"],
        maxLength: [13, "ISBN deve ter no máximo 13 caracteres"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    genero: {
        type: String,
        required: true,
        minLength: [1, "Gênero é obrigatório"]
    },
    anoPublicacao: {
        type: Number,
        required: true,
        min: [1000, "Ano de publicação deve ser um número inteiro de 4 dígitos"],
        max: [new Date().getFullYear(), "Ano de publicação não pode ser no futuro"]
    },
    descricao: {
        type: String,
        required: true,
        maxLength: [500, "Descrição deve ter no máximo 500 caracteres"]
    },
    fotoCapa: {
        type: String,
        required: true,
    },
    precoCompra: {
        type: Number,
        required: true,
        min: [0, "Preço deve ser um valor positivo"]
    },
    precoAluguer: {
        type: Number,
        required: true,
        min: [0, "Preço deve ser um valor positivo"]
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock deve ser um número inteiro"]
    },
    totalParaAluguer: {
        type: Number,
        required: true,
        min: [0, "Total para aluguer deve ser um número inteiro"]
    },
    disponivelParaAluguer: {
        type: Number,
        required: true,
        min: [0, "Disponível para aluguer deve ser um número inteiro"]
    }
}, { timestamps: true })

export const BookModel = model<BookEntity>("Book", BookSchema);