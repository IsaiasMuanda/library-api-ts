import { Container } from "inversify";
import type { IuserRepository } from "../modules/user/user.interface.ts";
import { UserRepository } from "../modules/user/user.repository.ts";

export const TYPES = {
    IUserRepository: Symbol.for("IUserRepository")
};

export const container: Container = new Container();

container.bind<IuserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();