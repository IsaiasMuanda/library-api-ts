import { ObjectId } from "mongoose";
import { CreateAuthorDTO, UpdateAuthorDTO } from "./author.schema";

export interface AuthorEntity {
    _id: ObjectId,
    nome: string,
    bio?: string,
    nacionalidade?: string
}

export interface IAuthorRepository {
    //Get all com paginação
    findById(id: string): Promise<AuthorEntity | null>;
    create(author: CreateAuthorDTO): Promise<AuthorEntity>
    update(id: string, author: UpdateAuthorDTO): Promise<AuthorEntity | null>
    delete(id: string): Promise<void>
}

export interface IAuthorService {
    //Get all com paginação
    getById(id: string): Promise<AuthorEntity | null>;
    createAuthor(author: CreateAuthorDTO): Promise<AuthorEntity>
    updateAuthor(id: string, author: UpdateAuthorDTO): Promise<AuthorEntity | null>
    deleteAuthor(id: string): Promise<void>
}

