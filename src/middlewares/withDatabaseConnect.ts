import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { MiddlewareFactory } from './types';
import dbConnect from '@/utils/database';

const withDatabaseConnection: MiddlewareFactory = (next: NextMiddleware) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const res = await next(req, _next);
    if (res) {
      await dbConnect();
    }
    return res;
  };
};

export default withDatabaseConnection;
