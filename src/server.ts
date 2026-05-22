import { app } from "./app";
import { connectDB } from "./config/database";
import { RunExpireReservationJob } from "./jobs/expireReservation.job";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        RunExpireReservationJob();
        setInterval(RunExpireReservationJob, 15 * 60 * 1000);

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta: ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
        process.exit(1);
    }
}

startServer();