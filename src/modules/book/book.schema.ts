import z from "zod";

export const CreateBookSchema = z.object({
    titulo: z.string().trim().min(1, "Título é obrigatório").max(100, "Título deve ter no máximo 100 caracteres"),
    isbn: z.string().min(10, "ISBN deve ter pelo menos 10 caracteres").max(13, "ISBN deve ter no máximo 13 caracteres"),
    autorId: z.string().length(24, "ID do autor inválido"),
    genero: z.string().min(1, "Gênero é obrigatório"),
    anoPublicacao: z.number().int().min(1000, "Ano de publicação deve ser um número inteiro de 4 dígitos").max(new Date().getFullYear(), "Ano de publicação não pode ser no futuro"),
    descricao: z.string().max(500, "Descrição deve ter no máximo 500 caracteres"),
    fotoCapa: z.string().url("Foto de capa deve ser uma URL válida"),
    precoCompra: z.number().int().nonnegative("Preço deve ser um valor positivo"),
    precoAluguer: z.number().int().nonnegative("Preço deve ser um valor positivo"),
    stock: z.number().min(0, "Stock deve ser um número inteiro"),
    totalParaAluguer: z.number().min(0, "Total para aluguer deve ser um número inteiro"),
});

export const UpdateBookSchema = CreateBookSchema.partial().omit({ autorId: true }).refine(data => Object.keys(data).length > 0, {
    message: "Envie pelo menos um campo para atualizar",
});

export type CreateBookDTO = z.infer<typeof CreateBookSchema>;
export type UpdateBookDTO = z.infer<typeof UpdateBookSchema>;