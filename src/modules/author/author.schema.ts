import z from "zod";

export const createAuthorSchema = z.object({
    nome: z.string().trim().min(2, "Nome muito curto").max(100, "Nome muito longo"),
    bio: z.string().trim().max(150, "Bio muito longa").optional(),
    nacionalidade: z.string().trim().optional()
})

export const updateAuthorSchema = createAuthorSchema.partial().refine(data => Object.keys(data).length > 0, {
    message: "Envie pelo menos um campo para atualizar",
});

export type CreateAuthorDTO = z.infer<typeof createAuthorSchema>
export type UpdateAuthorDTO = z.infer<typeof updateAuthorSchema>
