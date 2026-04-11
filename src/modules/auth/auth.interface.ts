import { UserEntity } from "../user/user.entity";
import { LoginDTO } from "./auth.schema";

export interface IAuthService {
    login(user: LoginDTO): Promise<UserEntity>;
    logout(): Promise<void>;
    getMe(): Promise<UserEntity>;
}