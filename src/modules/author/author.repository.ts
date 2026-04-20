import { injectable } from "inversify";
import { buildPaginationOptions } from "../../shared/utils/pagination";
import { AuthorEntity, IAuthorRepository } from "./author.interface";
import { AuthorModel } from "./author.model";
import { CreateAuthorDTO, UpdateAuthorDTO } from "./author.schema";

@injectable()
export class AuthorRepository implements IAuthorRepository {
    async findAll(opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: AuthorEntity[]; total: number; }> {
        const [items, total] = await Promise.all([
            AuthorModel.find()
                .sort(opts.sort)
                .skip(opts.skip)
                .limit(opts.limit)
                .lean(),

            AuthorModel.countDocuments()
        ]);
        return { items, total }
    }

    async findById(id: string): Promise<AuthorEntity | null> {
        return AuthorModel.findById(id).lean();
    }

    async create(author: CreateAuthorDTO): Promise<AuthorEntity> {
        return AuthorModel.create(author).then(doc => doc.toObject());
    }

    async update(id: string, author: UpdateAuthorDTO): Promise<AuthorEntity | null> {
        return AuthorModel.findByIdAndUpdate(id, author, { new: true }).lean();
    }

    async delete(id: string): Promise<void> {
        await AuthorModel.findByIdAndDelete(id);
    }
}

