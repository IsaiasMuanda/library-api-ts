import { UserEntity } from "../modules/user/user.entity";

//Types para IoC

export type AuthResponse = {
    user: Omit<UserEntity, "password">;
    token: string;
};

export type SafeUser = Omit<UserEntity, "password">;

