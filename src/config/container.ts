import { Container } from "inversify";
import { TYPES } from "../shared/types/TYPES.ts";
import type { IUserRepository, IUserService } from "../modules/user/user.interface.ts";
import { UserRepository } from "../modules/user/user.repository.ts";
import { UserService } from "../modules/user/user.service.ts";
import { IAuthService } from "../modules/auth/auth.interface.ts";
import { AuthService } from "../modules/auth/auth.service.ts";
import { UserController } from "../modules/user/user.controller.ts";
import { AuthController } from "../modules/auth/auth.controller.ts";
import { AuthorRepository } from "../modules/author/author.repository.ts";
import { IAuthorRepository } from "../modules/author/author.interface.ts";

export const container: Container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();

container.bind<IAuthService>(TYPES.IAuthService).to(AuthService).inSingletonScope();
container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();

container.bind<IAuthorRepository>(TYPES.AuthorRepository).to(AuthorRepository).inSingletonScope();