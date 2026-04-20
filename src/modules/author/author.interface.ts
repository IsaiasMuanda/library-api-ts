import { ObjectId } from "mongoose";
import { CreateAuthorDTO, UpdateAuthorDTO } from "./author.schema";
import { buildPaginationOptions, buildPaginationMeta, PaginationMeta } from "../../shared/utils/pagination";

export interface AuthorEntity {
    _id: ObjectId,
    nome: string,
    bio?: string,
    nacionalidade?: string
}

export interface IAuthorRepository {
    findAll(opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: AuthorEntity[], total: number }>
    findById(id: string): Promise<AuthorEntity | null>
    create(author: CreateAuthorDTO): Promise<AuthorEntity>
    update(id: string, author: UpdateAuthorDTO): Promise<AuthorEntity | null>
    delete(id: string): Promise<void>
}

export interface IAuthorService {
    getAll(opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: AuthorEntity[]; meta: PaginationMeta }>;
    getById(id: string): Promise<AuthorEntity | null>
    createAuthor(author: CreateAuthorDTO): Promise<AuthorEntity>
    updateAuthor(id: string, author: UpdateAuthorDTO): Promise<AuthorEntity>
    deleteAuthor(id: string): Promise<void>
}

