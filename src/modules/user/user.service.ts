import { inject, injectable } from "inversify";
import type { IUserRepository, IUserService } from "./user.interface.ts";
import type { UpdateUserDTO } from "./user.schema.ts";
import { SafeUser } from "../../config/types.ts";
import { TYPES } from "../../shared/types/TYPES.ts";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository
    ) { }

    async getAllUsers(): Promise<SafeUser[]> {
        const users = await this.userRepository.getAll();

        return users.map(({ password, ...user }) => user);
    }

    async getUserById(id: string): Promise<SafeUser | null> {
        const user = await this.userRepository.getById(id);

        if (!user) throw new Error("Usuário não encontrado");

        const { password, ...safeUser } = user;

        return safeUser;
    }

    async updateUser(id: string, user: UpdateUserDTO): Promise<SafeUser | null> {
        const updatedUser = await this.userRepository.update(id, user);

        if (!updatedUser) throw new Error("Usuário não encontrado");

        const { password, ...safeUser } = updatedUser;

        return safeUser;
    }

    async deleteUser(id: string): Promise<void> {
        const existingUser = await this.userRepository.getById(id);

        if (!existingUser) throw new Error("Usuário não encontrado");

        await this.userRepository.delete(id);
    }
}