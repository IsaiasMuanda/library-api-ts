export interface UserEntity {
    _id: string;
    nome: string;
    email: string;
    password: string;
    role: "admin" | "user";
    endereco?: string;
    telefone: string;
    createdAt: Date;
    updatedAt: Date;
}