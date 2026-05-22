import { ObjectId, Types } from "mongoose";
import { CreateBookDTO, UpdateBookDTO } from "./book.schema";
import { buildPaginationOptions, PaginationMeta } from "../../shared/utils/pagination";

export interface BookFilters {
    genero?: string;
    titulo?: string;
    autor?: string;
    anoPublicacao?: number;
    type?: 'compra' | 'aluguer';
    minPreco?: number;
    maxPreco?: number;
}

export interface BookEntity {
    _id: Types.ObjectId;
    titulo: string;
    isbn: string;
    autor: Types.ObjectId;
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

export interface CreateBookData extends CreateBookDTO {
    disponivelParaAluguer: number;
}

export interface IBookRepository {
    findAll(filters: BookFilters, opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: BookEntity[], total: number }>
    findById(id: string): Promise<BookEntity | null>;
    create(book: CreateBookData): Promise<BookEntity>;
    update(id: string, book: UpdateBookDTO): Promise<BookEntity | null>;
    delete(id: string): Promise<void>;
    updateStock(id: string, field: "stock" | "disponivelParaAluguer", amount: number): Promise<void>
}

export interface IBookService {
    getAll(filters: BookFilters, opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: BookEntity[], meta: PaginationMeta }>
    getById(id: string): Promise<BookEntity | null>;
    createBook(book: CreateBookDTO): Promise<BookEntity>;
    updateBook(id: string, book: UpdateBookDTO): Promise<BookEntity | null>;
    deleteBook(id: string): Promise<void>;
}