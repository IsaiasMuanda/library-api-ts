import { injectable } from "inversify";
import { BookEntity, BookFilters, IBookRepository } from "./book.interface";
import { BookModel } from "./book.model";
import { CreateBookDTO, UpdateBookDTO } from "./book.schema";
import { buildPaginationOptions } from "../../shared/utils/pagination";
import { Types } from "mongoose";


@injectable()
export class BookRepository implements IBookRepository {

    async findAll(filters: BookFilters, opts: ReturnType<typeof buildPaginationOptions>) {
        const query: Record<string, unknown> = {};
        if (filters.genero) query.genero = filters.genero;
        if (filters.titulo) query.titulo = { $regex: filters.titulo, $options: 'i' };
        if (filters.autor) query.autor = new Types.ObjectId(filters.autor);
        if (filters.anoPublicacao) query.anoPublicacao = filters.anoPublicacao;
        if (filters.type === 'compra') query.stock = { $gt: 0 };
        if (filters.type === 'aluguer') query.disponivelParaAluguer = { $gt: 0 };

        if (filters.minPreco !== undefined || filters.maxPreco !== undefined) {
            const precoQuery: { $gte?: number; $lte?: number } = {};
            if (filters.minPreco !== undefined) precoQuery.$gte = filters.minPreco;
            if (filters.maxPreco !== undefined) precoQuery.$lte = filters.maxPreco;
            query.precoCompra = precoQuery;
        }

        const [items, total] = await Promise.all([
            BookModel.find(query)
                .populate('autor')
                .sort(opts.sort)
                .skip(opts.skip)
                .limit(opts.limit),
            BookModel.countDocuments(query),
        ]);

        return { items, total };
    }

    async findById(id: string): Promise<BookEntity | null> {
        return BookModel.findById(id).lean();
    }

    async create(book: CreateBookDTO): Promise<BookEntity> {
        const newBook = await BookModel.create(book);

        return newBook.toObject();
    }

    async update(id: string, book: UpdateBookDTO): Promise<BookEntity | null> {
        return BookModel.findByIdAndUpdate(id, book, { new: true }).lean();
    }

    async delete(id: string): Promise<void> {
        await BookModel.findByIdAndDelete(id);
    }

    async updateStock(id: string, field: "stock" | "disponivelParaAluguer", amount: number): Promise<void> {
        await BookModel.findByIdAndUpdate(id, { $inc: { [field]: amount } });
    }
}