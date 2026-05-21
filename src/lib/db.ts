import mongoose from "mongoose";

let connection: Promise<typeof mongoose> | null = null;

export function hasMongoUri() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!connection) {
    connection = mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "seren-travel",
      bufferCommands: false,
    });
  }

  return connection;
}
