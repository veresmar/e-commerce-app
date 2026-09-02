import "./env.js";
import { readFile } from "node:fs/promises";
import { pool } from "./db.js";

const migration = await readFile(
  new URL("../db/migrations/001_create_tasks.sql", import.meta.url),
  "utf8",
);

try {
  await pool.query(migration);
  console.log("Database migration completed.");
} finally {
  await pool.end();
}
