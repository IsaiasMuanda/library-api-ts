import { Container } from "inversify";
import { TYPES } from "../shared/types/TYPES.ts";
import type { IUserRepository, IUserService } from "../modules/user/user.interface.ts";
import { UserRepository } from "../modules/user/user.repository.ts";
import { UserService } from "../modules/user/user.service.ts";
import { IAuthService } from "../modules/auth/auth.interface.ts";
import { AuthService } from "../modules/auth/auth.service.ts";
import { AuthorRepository } from "../modules/author/author.repository.ts";
import { IAuthorRepository } from "../modules/author/author.interface.ts";
import { IAuthorService } from "../modules/author/author.interface.ts";
import { AuthorService } from "../modules/author/author.service.ts";
import { IBookRepository, IBookService } from "../modules/book/book.interface.ts";
import { BookRepository } from "../modules/book/book.repository.ts";
import { BookService } from "../modules/book/book.service.ts";
import { ICartRepository, ICartService } from "../modules/cart/cart.interface.ts";
import { CartRepository } from "../modules/cart/cart.repository.ts";
import { CartService } from "../modules/cart/cart.service.ts";

export const container: Container = new Container();

//User
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();

//Auth
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService).inSingletonScope();

//Author
container.bind<IAuthorRepository>(TYPES.IAuthorRepository).to(AuthorRepository).inSingletonScope();
container.bind<IAuthorService>(TYPES.IAuthorService).to(AuthorService).inSingletonScope();

//Book
container.bind<IBookRepository>(TYPES.IBookRepository).to(BookRepository).inSingletonScope();
container.bind<IBookService>(TYPES.IBookService).to(BookService).inSingletonScope();

//Cart
container.bind<ICartRepository>(TYPES.ICartRepository).to(CartRepository).inSingletonScope();
container.bind<ICartService>(TYPES.ICartService).to(CartService).inSingletonScope()