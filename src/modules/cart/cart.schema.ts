import z from "zod";

export const AddToCartSchema = z.object({
    book: z.string().length(24, "ID de livro inválido"),
    type: z.enum(["compra", "aluguer"]),
    quantitdade: z.number().min(1, "Adicione pelo menos um produto"),
})

export const UpdateQuantitySchema = AddToCartSchema.pick({
    type: true,
    quantitdade: true,
});

export type AddToCartDTO = z.infer<typeof AddToCartSchema>
export type UpdateQuantityDTO = z.infer<typeof UpdateQuantitySchema>