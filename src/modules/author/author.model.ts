import { model, Schema } from "mongoose";
import { AuthorEntity } from "./author.interface";

const AuthorSchema = new Schema<AuthorEntity>(
    {
        nome: {
            type: String,
            required: true,
            trim: true
        },
        bio: {
            type: String,
            maxLength: [150, "Excedeu o número de caracteres"]
        },
        nacionalidade: {
            type: String,
        }
    }, { timestamps: true })

export const AuthorModel = model<AuthorEntity>("Author", AuthorSchema)