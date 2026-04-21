import { ObjectId } from "mongoose";
import { SafeUser } from "../../config/types.ts";
import type { CreateUserDTO, UpdateUserDTO } from "./user.schema.ts";
import { buildPaginationOptions, PaginationMeta } from "../../shared/utils/pagination.ts";

export interface UserEntity {
    _id: ObjectId;
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
    create(user: CreateUserDTO): Promise<UserEntity>;
    findAll(opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: UserEntity[]; total: number }>;
    findById(id: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
    update(id: string, user: UpdateUserDTO): Promise<UserEntity | null>;
    delete(id: string): Promise<void>;
}

export interface IUserService {
    getAllUsers(opts: ReturnType<typeof buildPaginationOptions>): Promise<{ items: SafeUser[]; meta: PaginationMeta }>;
    getUserById(id: string): Promise<SafeUser | null>;
    updateUser(id: string, user: UpdateUserDTO): Promise<SafeUser | null>;
    deleteUser(id: string): Promise<void>;
}