import { inject, injectable } from "inversify";
import { AuthorEntity, IAuthorRepository, IAuthorService } from "./author.interface";
import { TYPES } from "../../shared/types/TYPES";
import { buildPaginationMeta, buildPaginationOptions, PaginationMeta } from "../../shared/utils/pagination";
import { AppError } from "../../shared/errors/AppError";
import { CreateAuthorDTO, UpdateAuthorDTO } from "./author.schema";

@injectable()
export class AuthorService implements IAuthorService {
    constructor(@inject(TYPES.IAuthorRepository) private authorRepository: IAuthorRepository) { }

    async getAll(opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: AuthorEntity[]; meta: PaginationMeta; }> {
        const { items, total } = await this.authorRepository.findAll(opts);
        const meta = buildPaginationMeta(total, opts.page, opts.limit);

        return { items, meta };
    }

    async getById(id: string): Promise<AuthorEntity | null> {
        const author = await this.authorRepository.findById(id);
        if (!author) throw new AppError("Autor não encontrado", 404);

        return author;

    }

    async createAuthor(author: CreateAuthorDTO): Promise<AuthorEntity> {
        return this.authorRepository.create(author);
    }

    async updateAuthor(id: string, author: UpdateAuthorDTO): Promise<AuthorEntity> {
        const existingAuthor = await this.authorRepository.findById(id);
        if (!existingAuthor) throw new AppError("Autor não encontrado", 404);

        const updatedAuthor = await this.authorRepository.update(id, author);

        if (!updatedAuthor) throw new AppError("Erro ao atualizar autor", 500);
        return updatedAuthor;
    }

    async deleteAuthor(id: string): Promise<void> {
        const existingAuthor = await this.authorRepository.findById(id);
        if (!existingAuthor) throw new AppError("Autor não encontrado", 404);

        await this.authorRepository.delete(id);
    }
}