import { inject, injectable } from "inversify";
import type { IUserRepository, IUserService } from "./user.interface.ts";
import type { CreateUserDTO, UpdateUserDTO } from "./user.schema.ts";
import { AuthResponse, TYPES } from "../../config/types.ts";
import { UserEntity } from "./user.entity.ts";
import jwt from "jsonwebtoken";

@injectable()
export class UserService implements IUserService {
    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) { }

    async createUser(user: CreateUserDTO): Promise<AuthResponse> {
        const existUser = await this.userRepository.getByEmail(user.email);

        if (existUser) throw new Error("Email já cadastrado");

        const createdUser = await this.userRepository.create(user);

        const token = this.generateToken(createdUser);

        return {
            user: createdUser,
            token
        }
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.getAll();
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        const user = await this.userRepository.getById(id);

        if (!user) throw new Error("Usuário não encontrado");

        return user;
    }

    async updateUser(id: string, user: UpdateUserDTO): Promise<UserEntity | null> {
        const updatedUser = await this.userRepository.update(id, user);

        if (!updatedUser) throw new Error("Usuário não encontrado");

        return updatedUser;
    }

    async deleteUser(id: string): Promise<void> {
        const existingUser = await this.userRepository.getById(id);

        if (!existingUser) throw new Error("Usuário não encontrado");

        await this.userRepository.delete(id);
    }

    private generateToken(user: UserEntity) {
        return jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "3d" }
        )
    }
}