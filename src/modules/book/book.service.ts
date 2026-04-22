import { inject, injectable } from "inversify";
import { BookEntity, BookFilters, CreateBookData, IBookRepository, IBookService } from "./book.interface";
import { TYPES } from "../../shared/types/TYPES";
import { buildPaginationMeta, buildPaginationOptions, PaginationMeta } from "../../shared/utils/pagination";
import { AppError } from "../../shared/errors/AppError";
import { IAuthorRepository } from "../author/author.interface";
import { CreateBookDTO, UpdateBookDTO } from "./book.schema";

@injectable()
export class BookService implements IBookService {
    constructor(@inject(TYPES.IBookRepository) private bookRepository: IBookRepository, @inject(TYPES.IAuthorRepository) private authorRepository: IAuthorRepository) { }

    async getAll(filters: BookFilters, opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: BookEntity[]; meta: PaginationMeta; }> {
        const { items, total } = await this.bookRepository.findAll(filters, opts);

        const meta = buildPaginationMeta(total, opts.page, opts.limit);

        return { items, meta }
    }

    async getById(id: string): Promise<BookEntity | null> {
        const book = await this.bookRepository.findById(id);

        if (!book) throw new AppError("Livro não encontrado", 404);

        return book;
    }

    async createBook(book: CreateBookDTO): Promise<BookEntity> {
        const author = await this.authorRepository.findById(book.autor as string);
        if (!author) throw new AppError("Autor não encontrado", 404);

        return this.bookRepository.create({
            ...book,
            disponivelParaAluguer: book.totalParaAluguer
        });
    }

    async updateBook(id: string, book: UpdateBookDTO): Promise<BookEntity> {
        const existingBook = await this.bookRepository.findById(id);
        if (!existingBook) throw new AppError('Livro não encontrado', 404);

        const newBook = await this.bookRepository.update(id, book);
        if (!newBook) throw new AppError('Erro ao atualizar livro', 500);
        return newBook;
    }

    async deleteBook(id: string): Promise<void> {
        const existingBook = await this.bookRepository.findById(id);
        if (!existingBook) throw new AppError('Livro não encontrado', 404);
        await this.bookRepository.delete(id);
    }
}