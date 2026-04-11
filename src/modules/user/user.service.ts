import { inject, injectable } from "inversify";
import type { IUserRepository, IUserService } from "./user.interface.ts";
import type { CreateUserDTO, UpdateUserDTO } from "./user.schema.ts";
import { AuthResponse, SafeUser, TYPES } from "../../config/types.ts";
import { UserEntity } from "./user.entity.ts";
import jwt from "jsonwebtoken";


@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository
    ) {}

    async createUser(user: CreateUserDTO): Promise<AuthResponse> {
        const existUser = await this.userRepository.getByEmail(user.email);

        if (existUser) throw new Error("Email já cadastrado");

        const createdUser = await this.userRepository.create(user);

        const { password, ...safeUser } = createdUser;

        const token = this.generateToken(createdUser);

        return {
            user: safeUser,
            token
        };
    }

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

    private generateToken(user: UserEntity) {
        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "3d" }
        );
    }
}