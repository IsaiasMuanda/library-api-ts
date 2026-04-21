import { inject, injectable } from "inversify";
import { IAuthorService } from "./author.interface";
import { TYPES } from "../../shared/types/TYPES";
import { NextFunction, Request, Response } from "express";
import { buildPaginationOptions } from "../../shared/utils/pagination";

@injectable()
export class AuthorController {
    constructor(@inject(TYPES.IAuthorService) private authorService: IAuthorService) { }

    async getAllAuthors(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const opts = buildPaginationOptions(req.query);
            const { items, meta } = await this.authorService.getAll(opts);
            res.json({ success: true, data: items, meta });
        } catch (error) {
            next(error);
        }
    }

    async getAuthorById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            const author = await this.authorService.getById(id);

            res.json({ success: true, data: author });
        } catch (error) {
            next(error);
        }
    }

    async createAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const authorData = req.body;
            const newAuthor = await this.authorService.createAuthor(authorData);

            res.status(201).json({ success: true, data: newAuthor });
        } catch (error) {
            next(error);
        }
    }

    async updateAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            const authorData = req.body;
            const updatedAuthor = await this.authorService.updateAuthor(id, authorData);

            res.json({ success: true, data: updatedAuthor });
        } catch (error) {
            next(error);
        }
    }

    async deleteAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id as string;
            await this.authorService.deleteAuthor(id);
            res.json({ success: true, message: "Autor deletado com successo" });
        } catch (error) {
            next(error);
        }
    }
}