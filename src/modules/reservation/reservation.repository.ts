import { injectable } from "inversify";
import { CreateReservationData, IReservationRepository, ReservationEntity, ReservationFilters } from "./reservation.interface";
import { ReservationModel } from "./reservation.model";
import { buildPaginationOptions } from "../../shared/utils/pagination";
import { Types } from "mongoose";

@injectable()
export class ReservationRepository implements IReservationRepository {

    async create(data: CreateReservationData): Promise<ReservationEntity> {
        return ReservationModel.create(data).then(doc => doc.toObject());
    }

    async findById(id: string): Promise<ReservationEntity | null> {
        return ReservationModel.findById(id).lean();
    }

    async findAll(filters: ReservationFilters, opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: ReservationEntity[]; total: number; }> {
        const query: Record<string, unknown> = {};
        if (filters.status) query.status = filters.status;
        if (filters.user) query.user = new Types.ObjectId(filters.user);

        const [items, total] = await Promise.all([
            ReservationModel.find(query)
                .populate('user', '-password')
                .populate('items.book')
                .sort(opts.sort)
                .skip(opts.skip)
                .limit(opts.limit)
                .lean(),
            ReservationModel.countDocuments(query),
        ]);

        return { items, total }
    }

    // async updateStatus(id: string, status: string): Promise<ReservationEntity | null> {
    //     return ReservationModel.findByIdAndUpdate(
    //         id,
    //         { $set: { status } },
    //         { new: true }
    //     ).lean();
    // }

    async update(id: string, data: Partial<ReservationEntity>): Promise<ReservationEntity | null> {
        return ReservationModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        ).lean();
    }

    async findExpired(): Promise<ReservationEntity[]> {
        return ReservationModel.find({
            status: "pendente",
            dataExpiracao: { $lt: new Date() }
        }).lean();
    }
}