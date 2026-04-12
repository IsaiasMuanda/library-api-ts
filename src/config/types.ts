import { UserEntity } from "../modules/user/user.entity";

//Types para IoC
export const TYPES = {
    IUserRepository: Symbol.for("IUserRepository"),
    IUserService: Symbol.for("IUserService"),

    IAuthService: Symbol.for("IAuthService"),
};

export type AuthResponse = {
    user: Omit<UserEntity, "password">;
    token: string;
};

export type SafeUser = Omit<UserEntity, "password">;

export type AuthRequest = Request & {
    user?: {
        id: string;
        role: string;
    };
};
