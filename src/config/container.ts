import { Container } from "inversify";
import type { IUserRepository, IUserService } from "../modules/user/user.interface.ts";
import { UserRepository } from "../modules/user/user.repository.ts";
import { UserService } from "../modules/user/user.service.ts";
import { TYPES } from "./types.ts";
import { IAuthService } from "../modules/auth/auth.interface.ts";
import { AuthService } from "../modules/auth/auth.service.ts";

export const container: Container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();

container.bind<IAuthService>(TYPES.IAuthService).to(AuthService).inSingletonScope();