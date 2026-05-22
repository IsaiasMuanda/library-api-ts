import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // janela de 15 minutos em milissegundos
    max: 100,                  // máximo de requests por janela
    message: {                 // resposta quando o limite é atingido
        success: false,
        message: "Demasiados pedidos. Tenta novamente mais tarde."
    }
});

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {                
        success: false,
        message: "Demasiados pedidos. Tenta novamente mais tarde."
    }
})