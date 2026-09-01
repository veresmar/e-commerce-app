import express from "express";
import cors from "cors";
import { readFile } from "node:fs/promises";


const app = express(); // создание express-приложения
const PORT = 3000; 
const TASKS_FILE = "./server/data/tasks.json";

app.use(cors()); // разрешаем запросы от frontend, CORS - ограничение, применяемое браузером к cross-origin запросам

app.get("/api/tasks", async (_req, res) => { // Когда приходит GET-запрос на /api/tasks, выполни эту функцию (request - пришло ОТ клиента, res - отправляем КЛИЕНТУ)
  const data = await readFile(TASKS_FILE, "utf-8");
  const tasks = JSON.parse(data);
  res.json(tasks); // возвращающую клиенту JSON, содержащий пустой массив
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});