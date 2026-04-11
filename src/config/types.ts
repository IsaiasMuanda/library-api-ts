import { UserEntity } from "../modules/user/user.entity";

//Types para IoC
export const TYPES = {
    IUserRepository: Symbol.for("IUserRepository"),
    IUserService: Symbol.for("IUserService"),
};

export type AuthResponse = {
    user: UserEntity;
    token: string;
};