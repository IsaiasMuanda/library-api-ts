import { Document } from "mongoose";

export interface IUser extends Document {
    nome: string;
    email: string;
    password: string;
    role: "admin" | "user";
    endereco: string;
    telefone: string;
    createdAt: Date;
    updatedtedAt: Date;
}

export interface IUserRepository {
    getAll(): Promise<IUser[]>;
    getById(id: string): Promise<IUser | null>;
    update(id: string, user:
    Partial<IUser>): Promise<IUser | null>;
    delete(id: string): Promise<void>;
}

export interface IUserService {
    getAllUsers(): Promise<IUser[]>;
    getUserById(id: string): Promise<IUser | null>;
    updateUser(id: string, user: Partial<IUser>): Promise<IUser | null>;
    deleteUser(id: string): Promise<void>;
}