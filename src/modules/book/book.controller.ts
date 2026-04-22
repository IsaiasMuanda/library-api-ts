import { inject, injectable } from "inversify";
import { TYPES } from "../../shared/types/TYPES";
import { NextFunction, Request, Response } from "express";
import { buildPaginationOptions } from "../../shared/utils/pagination";
import { IBookService } from "./book.interface";
import { AppError } from "../../shared/errors/AppError";

@injectable()
export class BookController {
    constructor(@inject(TYPES.IBookService) private bookService: IBookService) { }

    async getAllBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const opts = buildPaginationOptions(req.query);

            const filters = {
                genero: req.query.genero as string | undefined,
                titulo: req.query.titulo as string | undefined,
                autor: req.query.autor as string | undefined,
                anoPublicacao: req.query.anoPublicacao ? Number(req.query.anoPublicacao) : undefined,
                type: req.query.type as 'compra' | 'aluguer' | undefined,
                minPreco: req.query.minPreco ? Number(req.query.minPreco) : undefined,
                maxPreco: req.query.maxPreco ? Number(req.query.maxPreco) : undefined,
            }

            const { items, meta } = await this.bookService.getAll(filters, opts);
            res.json({ success: true, data: items, meta });

        } catch (error) {
            next(error);
        }
    }

    async getBookById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            const book = await this.bookService.getById(id);

            res.json({ success: true, data: book });
        } catch (error) {
            next(error);
        }
    }

    async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const bookData = req.body;
            const newBook = await this.bookService.createBook(bookData);

            res.status(201).json({ success: true, data: newBook });

        } catch (error) {
            next(error);
        }
    }

    async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            const bookData = req.body;

            const updatedBook = await this.bookService.updateBook(id, bookData);

            res.status(200).json({ success: true, data: updatedBook });

        } catch (error) {
            next(error);
        }
    }

    async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;

            await this.bookService.deleteBook(id);

            res.json({ success: true, message: "Livro eliminado com sucesso" });
        } catch (error) {
            next(error);
        }
    }
}
