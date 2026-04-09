import { inject, injectable } from "inversify";
import type { IUser, IUserRepository, IUserService } from "./user.interface.ts";
import type { UpdateUserDTO } from "./user.schema.ts";
import { TYPES } from "../../config/types.ts";

@injectable()
export class UserService implements IUserService {
    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) { }

    async getAllUsers(): Promise<IUser[]> {
        return this.userRepository.getAll();
    }

    async getUserById(id: string): Promise<IUser | null> {
        const user = await this.userRepository.getById(id);

        if (!user) throw new Error("Usuário não encontrado");

        return user;
    }

    async updateUser(id: string, user: UpdateUserDTO): Promise<IUser | null> {
        const updatedUser = await this.userRepository.update(id, user);

        if (!updatedUser) throw new Error("Usuário não encontrado");

        return updatedUser;
    }

    async deleteUser(id: string): Promise<void> {
        const existingUser = await this.userRepository.getById(id);

        if (!existingUser) throw new Error("Usuário não encontrado");

        await this.userRepository.delete(id);
    }
}