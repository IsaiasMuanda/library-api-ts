import { injectable } from "inversify";
import type { Iuser, IuserRepository } from "./user.interface.ts";
import { UserModel } from "./user.model.ts";

@injectable()
export class UserRepository implements IuserRepository {
    async getAll(): Promise<Iuser[]> {
        return UserModel.find();
    }

    async getById(id: string): Promise<Iuser | null> {
        return await UserModel.findById(id);
    }

    async update(id: string, user: Partial<Iuser>): Promise<Iuser | null> {
        return await UserModel.findByIdAndUpdate(id, user, { new: true })
    }

    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id)
    }
}