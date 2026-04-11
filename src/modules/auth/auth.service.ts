// import { inject, injectable } from "inversify";
// import { IAuthService } from "./auth.interface";
// import { AuthResponse, TYPES } from "../../config/types";
// import { IUserRepository } from "../user/user.interface";
// import { LoginDTO } from "./auth.schema";

// @injectable()
// export class AuthService implements IAuthService {
//     constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) { }

//     login(user: LoginDTO): Promise<AuthResponse> {
//         const userExist = this.userRepository.getByEmail(user.email);

//         if (userExist) throw new Error("Email já se encontra em uso");


//     }
// }