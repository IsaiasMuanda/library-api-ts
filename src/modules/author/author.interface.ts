import { ObjectId } from "mongoose";

export interface AuthorEntity {
    _id: ObjectId,
    nome: string,
    bio?: string,
    nacionalidade?: string
}
