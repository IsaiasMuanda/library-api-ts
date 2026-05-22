import z from "zod";

const ConfirmReservationSchema = z.object({
    pickupDate: z.string().refine((d) => !isNaN(Date.parse(d)), { message: 'Data inválida' }),
})

export type ConfirmDTO = z.infer<typeof ConfirmReservationSchema>