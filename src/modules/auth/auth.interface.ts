import { AuthResponse, SafeUser } from "../../config/types";
import { CreateUserDTO } from "../user/user.schema";
import { LoginDTO } from "./auth.schema";

export interface IAuthService {
    signUp(user: CreateUserDTO): Promise<AuthResponse>;
    login(user: LoginDTO): Promise<AuthResponse>;
    getMe(id: string): Promise<SafeUser>;
}