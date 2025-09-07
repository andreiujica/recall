import { config } from 'dotenv';
import { resolve } from 'path';
import { defineConfig } from "drizzle-kit";

config({ path: resolve(__dirname, '../../.env') });

/**
 * We use a single driver: "turso" (aka libsql).
 * Works with:
 *  - local:  DATABASE_URL=file:./sqlite/dev.db
 *  - prod:   DATABASE_URL=libsql://<your-db>.turso.io  (+ DATABASE_AUTH_TOKEN for your app runtime)
 * 
 * NOTE: We will manually run migrations for now, so we can just use the development env file.
 */
const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("❌ Missing env DATABASE_URL (e.g. file:./sqlite/dev.db or libsql://...turso.io)");
}

export default defineConfig({
  schema: [
    "./schemas/bookmarks.sql.ts",
  ],
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: { url, authToken: process.env.DATABASE_AUTH_TOKEN },
  strict: true,
  verbose: true,
});
