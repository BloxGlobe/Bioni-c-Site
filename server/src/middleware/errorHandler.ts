import { Request, Response, NextFunction } from 'express';

interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] ${statusCode} - ${message}`, err.details);

  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message,
      details: err.details || null,
      timestamp: new Date().toISOString(),
    },
  });
};

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public details: any = null
  ) {
    super(message);
    this.name = 'AppError';
  }
}
