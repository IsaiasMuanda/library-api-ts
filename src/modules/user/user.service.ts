import { inject, injectable } from "inversify";
import type { Iuser, IuserRepository, IUserService } from "./user.interface.ts";
import { TYPES } from "../../config/container.ts";

@injectable()
export class UserService implements IUserService {
    constructor(@inject(TYPES.IUserRepository) private userRepository: IuserRepository) { }

    async getAllUsers(): Promise<Iuser[]> {
        return this.userRepository.getAll();
    }

    async getUserById(id: string): Promise<Iuser | null> {
        const user = await this.userRepository.getById(id);

        if (!user) throw new Error("Usuário não encontrado");

        return user;
    }

    async updateUser(id: string, user: Partial<Iuser>): Promise<Iuser | null> {
        const updateUser = await this.userRepository.update(id, user);

        if (!updateUser) throw new Error("Usuário não encontrado");

        return updateUser;
    }

    async deleteUser(id: string): Promise<void> {
        const existingUser = await this.userRepository.getById(id);

        if (!existingUser) throw new Error("Usuário não encontrado");

        await this.userRepository.delete(id);
    }
}