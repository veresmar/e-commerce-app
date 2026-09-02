import { Pool } from "pg";
import "./env.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) console.warn("DATABASE_URL is not set. Database requests will fail until it is configured.");

export const pool = new Pool({
  connectionString,
  ssl: connectionString?.includes("localhost") ? false : { rejectUnauthorized: false },
});
