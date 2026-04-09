import type { UpdateUserDTO } from "./user.schema.ts";

export interface IUser {
    nome: string;
    email: string;
    password: string;
    role: "admin" | "user";
    endereco?: string;
    telefone: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserRepository {
    getAll(): Promise<IUser[]>;
    getById(id: string): Promise<IUser | null>;
    update(id: string, user:
        UpdateUserDTO): Promise<IUser | null>;
    delete(id: string): Promise<void>;
}

export interface IUserService {
    getAllUsers(): Promise<IUser[]>;
    getUserById(id: string): Promise<IUser | null>;
    updateUser(id: string, user: UpdateUserDTO): Promise<IUser | null>;
    deleteUser(id: string): Promise<void>;
}