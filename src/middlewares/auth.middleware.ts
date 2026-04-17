import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

type TokenPayload = {
    id: string;
    role: string;
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Não autorizado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as TokenPayload;

        req.user = decoded;

        next();

    } catch {
        return res.status(401).json({ message: "Token inválido" });
    }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
    if (req.user?.role !== "admin") {
        res.status(403).json({ message: "Acesso restrito a administradores" });
        return;
    }
    next();
}