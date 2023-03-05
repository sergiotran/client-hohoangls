import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextHandler } from 'next-connect';

interface IApiError extends Error {
  status?: number;
}

export const createError = (status: number, message: string): IApiError => {
  const error: IApiError = new Error(message);
  error.status = status;
  return error;
};

export const errorHandler = (
  error: IApiError,
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  console.error({ message: message, stack: error.stack, context: req });
  res.status(status).json({ status, message });
};
