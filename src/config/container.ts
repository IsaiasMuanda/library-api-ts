import { Container } from "inversify";
import type { IUserRepository } from "../modules/user/user.interface.ts";
import { UserRepository } from "../modules/user/user.repository.ts";

export const TYPES = {
    IUserRepository: Symbol.for("IUserRepository")
};

export const container: Container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();