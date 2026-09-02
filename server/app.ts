import "./env.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import express, { type NextFunction, type Request, type Response } from "express";
import multer from "multer";
import { pool } from "./db.js";
import { categories, priorities, type Task, type TaskInput } from "./types/task.js";

type TaskRow = { id: string; title: string; description: string; priority: Task["priority"]; category: Task["category"]; date: string; image_url: string | null; done: boolean; created_at: Date; updated_at: Date };
const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") ?? true }));
app.use(express.json({ limit: "1mb" }));
cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => callback(null, file.mimetype.startsWith("image/")),
});

const toTask = (row: TaskRow): Task => ({ id: row.id, title: row.title, description: row.description, priority: row.priority, category: row.category, date: row.date, imageUrl: row.image_url, done: row.done, createdAt: row.created_at.toISOString(), updatedAt: row.updated_at.toISOString() });
function validateTask(value: unknown): TaskInput {
  const task = value as Partial<TaskInput>;
  if (!task || typeof task.title !== "string" || !task.title.trim()) throw new Error("A non-empty title is required.");
  if (typeof task.description !== "string" || !priorities.includes(task.priority as Task["priority"]) || !categories.includes(task.category as Task["category"]) || typeof task.date !== "string" || typeof task.done !== "boolean" || (task.imageUrl !== null && typeof task.imageUrl !== "string")) throw new Error("Task data is invalid.");
  return { ...task, title: task.title.trim() } as TaskInput;
}

app.get("/api/health", async (_req, res, next) => { try { await pool.query("SELECT 1"); res.json({ status: "ok" }); } catch (error) { next(error); } });
app.get("/api/tasks", async (_req, res, next) => { try { const { rows } = await pool.query<TaskRow>("SELECT * FROM tasks ORDER BY date ASC, created_at DESC"); res.json(rows.map(toTask)); } catch (error) { next(error); } });
app.post("/api/tasks", async (req, res, next) => { try { const task = validateTask(req.body); const { rows } = await pool.query<TaskRow>("INSERT INTO tasks (title, description, priority, category, date, image_url, done) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [task.title, task.description, task.priority, task.category, task.date, task.imageUrl, task.done]); res.status(201).json(toTask(rows[0])); } catch (error) { next(error); } });
app.patch("/api/tasks/:id", async (req, res, next) => { try { const task = validateTask(req.body); const { rows } = await pool.query<TaskRow>("UPDATE tasks SET title = $1, description = $2, priority = $3, category = $4, date = $5, image_url = $6, done = $7, updated_at = NOW() WHERE id = $8 RETURNING *", [task.title, task.description, task.priority, task.category, task.date, task.imageUrl, task.done, req.params.id]); if (!rows[0]) return res.status(404).json({ message: "Task not found." }); res.json(toTask(rows[0])); } catch (error) { next(error); } });
app.delete("/api/tasks/:id", async (req, res, next) => { try { const result = await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]); if (!result.rowCount) return res.status(404).json({ message: "Task not found." }); res.status(204).end(); } catch (error) { next(error); } });
app.post("/api/uploads", upload.single("image"), async (req, res, next) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) return res.status(503).json({ message: "Cloudinary is not configured." });
    if (!req.file) return res.status(400).json({ message: "Please provide an image smaller than 5 MB." });
    const file = req.file;
    const imageUrl = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: "task-manager", resource_type: "image" }, (error, result) => {
        if (error || !result?.secure_url) reject(error ?? new Error("Cloudinary did not return an image URL."));
        else resolve(result.secure_url);
      });
      stream.end(file.buffer);
    });
    res.status(201).json({ imageUrl });
  } catch (error) { next(error); }
});
app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => { void next; console.error(error); const message = error instanceof Error ? error.message : "Unexpected server error."; const isClientError = error instanceof multer.MulterError || message.includes("required") || message.includes("invalid"); res.status(isClientError ? 400 : 500).json({ message }); });
export { app };
