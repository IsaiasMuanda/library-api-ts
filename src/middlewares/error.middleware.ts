import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../shared/errors/AppError';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Internal server error',
  });
};
