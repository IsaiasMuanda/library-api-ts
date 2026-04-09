// dto/update-user.schema.ts
import { z } from "zod";

export const updateUserSchema = z.object({
    nome: z.string().optional(),
    email: z.string().email("Email inválido").toLowerCase().optional(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").optional(),
    role: z.enum(["admin", "user"]).optional(),
    endereco: z.string().optional(),
    telefone: z.string().optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "Envie pelo menos um campo para atualizar",
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;