export interface UpdateUserDTO {
    nome?: string;
    email?: string;
    password?: string;
    role?: "admin" | "user";
    endereco?: string;
    telefone?: string;
}