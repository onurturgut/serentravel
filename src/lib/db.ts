import dns from "node:dns";
import mongoose from "mongoose";

let connection: Promise<typeof mongoose> | null = null;
let dnsConfigured = false;

function configureMongoDns() {
  if (dnsConfigured || process.env.NODE_ENV === "production") {
    return;
  }

  dnsConfigured = true;
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

export function getDatabaseErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);

  if (
    message.includes("querySrv") ||
    message.includes("ECONNREFUSED") ||
    message.includes("ServerSelectionError") ||
    message.includes("Could not connect")
  ) {
    return "MongoDB baglantisi kurulamadı. Atlas Network Access IP izni ve internet/DNS baglantisini kontrol edin.";
  }

  if (message.includes("E11000") || message.includes("duplicate key")) {
    return "Bu slug ile kayit zaten var. Sayfayi yenileyip mevcut kaydi duzenleyin.";
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return error.message;
  }

  if (error instanceof mongoose.Error.CastError) {
    return "Gecersiz kayit ID'si.";
  }

  return "Veritabani islemi sirasinda hata olustu.";
}

export function hasMongoUri() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!connection) {
    configureMongoDns();
    connection = mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DB || "seren-travel",
        bufferCommands: false,
      })
      .catch((error) => {
        connection = null;
        throw error;
      });
  }

  return connection;
}
