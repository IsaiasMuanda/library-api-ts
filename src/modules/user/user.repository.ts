import { injectable } from "inversify";
import type { IUserRepository } from "./user.interface.ts";
import { UserModel } from "./user.model.ts";
import { CreateUserDTO, UpdateUserDTO } from "./user.schema.ts";
import { UserEntity } from "./user.entity.ts";

@injectable()
export class UserRepository implements IUserRepository {

    async create(user: CreateUserDTO): Promise<UserEntity> {
        return UserModel.create(user).then(doc => doc.toObject());
    }

    async getAll(): Promise<UserEntity[]> {
        return UserModel.find().lean();
    }

    async getById(id: string): Promise<UserEntity | null> {
        return await UserModel.findById(id).lean().lean();
    }

    async getByEmail(email: string): Promise<UserEntity | null> {
        return await UserModel.findOne({
            email: email.toLocaleLowerCase()
        }).then(doc => doc?.toObject() || null);
    }
    async update(id: string, user: UpdateUserDTO): Promise<UserEntity | null> {
        return await UserModel.findByIdAndUpdate(id, user, { new: true }).then(doc => doc?.toObject() || null);
    }

    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id)
    }
}