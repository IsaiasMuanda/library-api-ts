import { Document } from "mongoose";

export interface Iuser extends Document {
    nome: string;
    email: string;
    password: string;
    role: "admin" | "user";
    endereco: string;
    telefone: string;
    createdAt: Date;
    updatedtedAt: Date;
}

export interface IuserRepository {
    getAll(): Promise<Iuser[]>;
    getById(id: string): Promise<Iuser | null>;
    update(id: string, user:
    Partial<Iuser>): Promise<Iuser | null>;
    delete(id: string): Promise<void>;
}

export interface IUserService {
    getAllUsers(): Promise<Iuser[]>;
    getUserById(id: string): Promise<Iuser | null>;
    updateUser(id: string, user: Partial<Iuser>): Promise<Iuser | null>;
    deleteUser(id: string): Promise<void>;
}