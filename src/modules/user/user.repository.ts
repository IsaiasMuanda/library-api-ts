import { injectable } from "inversify";
import type { IUser, IUserRepository } from "./user.interface.ts";
import { UserModel } from "./user.model.ts";

@injectable()
export class UserRepository implements IUserRepository {
    async getAll(): Promise<IUser[]> {
        return UserModel.find();
    }

    async getById(id: string): Promise<IUser | null> {
        return await UserModel.findById(id);
    }

    async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(id, user, { new: true })
    }

    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id)
    }
}