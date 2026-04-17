import { inject, injectable } from "inversify";
import { IAuthService } from "./auth.interface";
import { AuthResponse } from "../../config/types";
import { IUserRepository } from "../user/user.interface";
import { LoginDTO } from "./auth.schema";
import { CreateUserDTO } from "../user/user.schema";
import jwt from "jsonwebtoken";
import { UserEntity } from "../user/user.entity";
import bcrypt from "bcryptjs";
import { TYPES } from "../../shared/types/TYPES";

@injectable()
export class AuthService implements IAuthService {
    constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) { }

    async signUp(user: CreateUserDTO): Promise<AuthResponse> {
        const existingUser = await this.userRepository.getByEmail(user.email);

        if (existingUser) throw new Error("Email já se encontra em uso");

        const newUser = await this.userRepository.create(user);
        const token = this.generateToken(newUser);

        const { password, ...safeUser } = newUser;

        return {
            user: safeUser,
            token
        }
    }

    private generateToken(user: UserEntity) {
        return jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "3d" }
        );
    }

    async login(user: LoginDTO): Promise<AuthResponse> {
        const existingUser = await this.userRepository.getByEmail(user.email);

        if (!existingUser) throw new Error("Email ou palavra-passe inválidos");

        const correctPassword = await bcrypt.compare(user.password, existingUser.password);

        if (!correctPassword) throw new Error("Email ou palavra-passe inválidos");

        const token = this.generateToken(existingUser);

        const { password, ...safeUser } = existingUser;

        return {
            user: safeUser,
            token,
        }
    }

    async getMe(userId: string) {
        const user = await this.userRepository.getById(userId);

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const { password, ...safeUser } = user;

        return safeUser;
    }

}
