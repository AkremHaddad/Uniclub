import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Next.js dev mode hot-reloads modules on every file change, which would
 * normally open a fresh Mongoose connection each time and exhaust MongoDB's
 * connection limit. Caching the connection promise on the global object
 * survives module reloads (it does NOT survive serverless cold starts,
 * which is fine — a fresh connection there is correct).
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set — copy .env.local.example to .env.local and fill it in.");
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
