import { IUserRepository } from "../user/user.interface";

export interface IAuth {
    nome: string;
    email: string;
    password: string;
}

export interface IAuthRepository extends IUserRepository {}

export interface IAuthService {
    signUp(user: IAuth): Promise<IAuth | null>;
    login(email: string, password: string): Promise<IAuth | null>;
    logout(): Promise<void>;
}