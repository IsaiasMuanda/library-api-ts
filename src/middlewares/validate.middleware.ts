import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const messages = err.issues.map((e) => `${e.path.map(String).join('.')}: ${e.message}`);
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Validation error',
          errors: messages,
        });
      }
      next(err);
    }
  };
};
