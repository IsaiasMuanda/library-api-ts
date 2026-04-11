import { AuthResponse, SafeUser } from "../../config/types.ts";
import { UserEntity } from "./user.entity.ts";
import type { CreateUserDTO, UpdateUserDTO } from "./user.schema.ts";

// export interface IUser {
//     nome: string;
//     email: string;
//     password: string;
//     role: "admin" | "user";
//     endereco?: string;
//     telefone: string;
//     createdAt: Date;
//     updatedAt: Date;
// }

export interface IUserRepository {
    create(user: CreateUserDTO): Promise<UserEntity>;
    getAll(): Promise<UserEntity[]>;
    getById(id: string): Promise<UserEntity | null>;
    getByEmail(email: string): Promise<UserEntity | null>;
    update(id: string, user: UpdateUserDTO): Promise<UserEntity | null>;
    delete(id: string): Promise<void>;
}

export interface IUserService {
    createUser(user: CreateUserDTO): Promise<AuthResponse>;
    getAllUsers(): Promise<SafeUser[]>;
    getUserById(id: string): Promise<SafeUser | null>;
    updateUser(id: string, user: UpdateUserDTO): Promise<SafeUser | null>;
    deleteUser(id: string): Promise<void>;
}