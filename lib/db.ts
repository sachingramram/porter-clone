import mongoose from "mongoose";

/**
 * Read env variable
 */
const envUri = process.env.MONGODB_URI;

if (!envUri) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

/**
 * ✅ Explicitly narrowed string
 * TypeScript is now 100% satisfied
 */
const MONGODB_URI: string = envUri;

/**
 * Mongoose connection cache type
 */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

/**
 * Extend global scope safely
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

/**
 * Initialize cache
 */
const cache: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cache;

/**
 * Connect to MongoDB (hot-reload safe)
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    // ✅ No TS error here
    cache.promise = mongoose.connect(MONGODB_URI);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
