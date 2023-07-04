import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_DB_URI) {
  throw new Error("MONGO_DB_URI env is required.");
}
if (!process.env.POSTGRES_HOST) {
  throw new Error("POSTGRES_HOST env is requried.");
}
if (!process.env.POSTGRES_USER) {
  throw new Error("POSTGRES_USER env is required.");
}
if (!process.env.POSTGRES_PASSWORD) {
  throw new Error("POSTGRES_PASSWORD env is required.");
}
if (!process.env.POSTGRES_DATABASE) {
  throw new Error("POSTGRES_DATABASE env is required.");
}

if (!process.env.POSTGRES_PORT) {
  throw new Error("POSTGRES_PORT env is required.");
}

export const config = {
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGO_DB_URI,
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DATABASE,
    port: Number(process.env.POSTGRES_PORT),
  },
};
