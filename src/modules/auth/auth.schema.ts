import { email, z } from "zod";

export const loginSchema = z.object({
    email: z.
        string()
        .email("Email inválido")
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .min(1, "Informe a senha"),
})

export type LoginDTO = z.infer<typeof loginSchema>;