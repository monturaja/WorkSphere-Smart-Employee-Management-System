import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Global flag for mock mode
global.isMockMode = global.isMockMode || false;

async function dbConnect() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing. Environment variables must be set.");
    global.isMockMode = true;
    return { connection: { isMock: true } };
  }
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Fail fast (5s) for better DX
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Successfully connected to MongoDB");
        global.isMockMode = false;
        return mongoose;
      })
      .catch((err) => {
        console.error("MongoDB connection error. Switching to MOCK MODE.");
        global.isMockMode = true;
        // Resolve with a mock connection object so await dbConnect() doesn't throw
        return { connection: { isMock: true } };
      });
  }
  
  try {
    cached.conn = await cached.promise;
    // Double check if the resolved value is our mock error object
    if (cached.conn && cached.conn.connection && cached.conn.connection.isMock) {
        global.isMockMode = true;
    }
  } catch (e) {
    global.isMockMode = true;
  }
  return cached.conn;
}

export default dbConnect;
