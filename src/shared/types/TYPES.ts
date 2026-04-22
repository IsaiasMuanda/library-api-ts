export const TYPES = {
    //User
    IUserRepository: Symbol.for("IUserRepository"),
    IUserService: Symbol.for("IUserService"),

    //Auth
    IAuthService: Symbol.for("IAuthService"),

    //Author
    IAuthorRepository: Symbol.for("IAuthorRepository"),
    IAuthorService: Symbol.for("IAuthorService"),

    //Book
    IBookRepository: Symbol.for("IBookRepository"),
    IBookService: Symbol.for("IBookService"),
};