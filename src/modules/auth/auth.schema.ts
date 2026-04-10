import { z } from "zod";

export const signUpSchema = z.object({
    nome: z.
        string()
        .min(2, "O nome deve ter no mínimo dois caracteres")
        .max(100, "Nome muito longo")
        .trim()
        .toLowerCase(),

    email: z.
        string()
        .email("Email inválido")
        .trim()
        .toLowerCase(),

    password: z.
        string()
        .min(6, "A password deve conter no mínimo 6 caracteres")
});

export const loginSchema = z.object({
    nome: z.
        string()
        .email("Email inválido")
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .min(1, "Informe a senha"),
})

export type signUpDTO = z.infer<typeof signUpSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;