import { UserEntity } from "../modules/user/user.interface";

export type AuthResponse = {
    user: Omit<UserEntity, "password">;
    token: string;
};

export type SafeUser = Omit<UserEntity, "password">;

