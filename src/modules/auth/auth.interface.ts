import { AuthResponse, SafeUser } from "../../config/types";
import { LoginDTO } from "./auth.schema";

export interface IAuthService {
    login(user: LoginDTO): Promise<AuthResponse>;
    logout(): Promise<void>;
    getMe(id: string): Promise<SafeUser>;
}