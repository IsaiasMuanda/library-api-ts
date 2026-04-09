import { Container } from "inversify";
import type { IUserRepository, IUserService } from "../modules/user/user.interface.ts";
import { UserRepository } from "../modules/user/user.repository.ts";
import { UserService } from "../modules/user/user.service.ts";

export const TYPES = {
    IUserRepository: Symbol.for("IUserRepository"),
    IUserService: Symbol.for("IUserService"),
};

export const container: Container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();