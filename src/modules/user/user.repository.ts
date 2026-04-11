import { injectable } from "inversify";
import type { IUserRepository } from "./user.interface.ts";
import { UserModel } from "./user.model.ts";
import { CreateUserDTO, UpdateUserDTO } from "./user.schema.ts";
import { UserEntity } from "./user.entity.ts";

@injectable()
export class UserRepository implements IUserRepository {

    async create(user: CreateUserDTO): Promise<UserEntity> {
        return await UserModel.create(user);
    }

    async getAll(): Promise<UserEntity[]> {
        return UserModel.find();
    }

    async getById(id: string): Promise<UserEntity | null> {
        return await UserModel.findById(id);
    }

    async getByEmail(email: string): Promise<UserEntity | null> {
        return await UserModel.findOne({
            email: email.toLocaleLowerCase()
        })
    }
    async update(id: string, user: UpdateUserDTO): Promise<UserEntity | null> {
        return await UserModel.findByIdAndUpdate(id, user, { new: true })
    }

    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id)
    }
}