import { injectable } from "inversify";
import type { IUserRepository, UserEntity } from "./user.interface.ts";
import { UserModel } from "./user.model.ts";
import { CreateUserDTO, UpdateUserDTO } from "./user.schema.ts";
import { buildPaginationOptions } from "../../shared/utils/pagination.ts";

@injectable()
export class UserRepository implements IUserRepository {

    async create(user: CreateUserDTO): Promise<UserEntity> {
        const doc = await UserModel.create(user);
        return doc.toObject();
    }

    async findAll(opts: ReturnType<typeof buildPaginationOptions>):
        Promise<{ items: UserEntity[]; total: number }> {

        const [items, total] = await Promise.all([
            UserModel.find()
                .sort(opts.sort)
                .skip(opts.skip)
                .limit(opts.limit)
                .lean<UserEntity[]>(),
            UserModel.countDocuments()
        ]);

        return { items, total };
    }

    async findById(id: string): Promise<UserEntity | null> {
        return UserModel.findById(id).lean<UserEntity | null>();
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return UserModel.findOne({
            email: email.toLowerCase()
        }).lean<UserEntity | null>();
    }

    async update(id: string, user: UpdateUserDTO): Promise<UserEntity | null> {
        return UserModel.findByIdAndUpdate(id, user, { new: true })
            .lean<UserEntity | null>();
    }

    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}