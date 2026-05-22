import { BookModel } from "../modules/book/book.model";
import { ReservationModel } from "../modules/reservation/reservation.model";

export async function RunExpireReservationJob() {

    try {
        const expiredReservations = await ReservationModel.find({
            status: "pendente",
            dataExpiracao: { $lt: new Date() }
        }).lean();

        for (const res of expiredReservations) {
            await Promise.all(
                res.items.map((item) => {
                    const field = item.type === 'compra' ? 'stock' : 'disponivelParaAluguer';
                    return BookModel.findByIdAndUpdate(item.book, {
                        $inc: { [field]: item.quantidade },
                    });
                }),
            );

            await ReservationModel.findByIdAndUpdate(res._id, { $set: { status: 'expirado' } });
            console.log(`[Job] Reserva ${res._id} expirada.`);
        }

    } catch (error) {
        console.error('[Job] Error in expireReservations:', error);
    }
}