import mongoose from 'mongoose';

declare global {
  var mongooseGlobal: {
    promise: Promise<typeof mongoose> | null;
    conn: typeof mongoose | null;
  };
}