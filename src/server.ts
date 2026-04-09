import express from "express";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
    return res.json({ message: "API rodando" });
})

app.listen(PORT, () => {
    console.log("Servidor rodando na porta: " + PORT);
})

