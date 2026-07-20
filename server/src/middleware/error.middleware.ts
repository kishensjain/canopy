import type{ Request, Response, NextFunction } from 'express';

export function notFoundHandler(_: Request, res: Response) {
  res.status(404).json({ error: true, message: 'Resource not found' });
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error('Unhandled error:', err);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const details = err.details || undefined;

  res.status(status).json({ error: true, message,status, details });
}