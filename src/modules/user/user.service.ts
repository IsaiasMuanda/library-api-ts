import { inject, injectable } from "inversify";
import type { IUserRepository, IUserService } from "./user.interface.ts";
import type { UpdateUserDTO } from "./user.schema.ts";
import { SafeUser } from "../../config/types.ts";
import { TYPES } from "../../shared/types/TYPES.ts";
import { AppError } from "../../shared/errors/AppError.ts";
import { buildPaginationMeta, buildPaginationOptions, PaginationMeta } from "../../shared/utils/pagination.ts";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository
    ) { }

    async getAllUsers(opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: SafeUser[]; meta: PaginationMeta; }> {
        const { items, total } = await this.userRepository.findAll(opts);
        const meta = buildPaginationMeta(total, opts.page, opts.limit);

        const safeUsers = items.map(({ password, ...safeUser }) => safeUser);
        return { items: safeUsers, meta };
    }

    async getUserById(id: string): Promise<SafeUser | null> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new AppError("Usuário não encontrado", 404);

        const { password, ...safeUser } = user;

        return safeUser;
    }

    async updateUser(id: string, user: UpdateUserDTO): Promise<SafeUser | null> {
        const updatedUser = await this.userRepository.update(id, user);

        if (!updatedUser) throw new AppError("Usuário não encontrado", 404);

        const { password, ...safeUser } = updatedUser;

        return safeUser;
    }

    async deleteUser(id: string): Promise<void> {
        const existingUser = await this.userRepository.findById(id);

        if (!existingUser) throw new AppError("Usuário não encontrado", 404)

        await this.userRepository.delete(id);
    }
}