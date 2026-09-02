# Task Manager

React/Vite frontend with an Express REST API, Neon PostgreSQL persistence, and Cloudinary image uploads.

## Local development

1. Copy `.env.example` to `.env` and fill in the Neon and Cloudinary values.
2. Apply the table schema with `npm run db:migrate` (or run [`db/migrations/001_create_tasks.sql`](db/migrations/001_create_tasks.sql) in the Neon SQL Editor).
3. Start the API with `npm run server` and the frontend in a second terminal with `npm run dev`.

Vite proxies `/api` calls to `http://localhost:3000`; the frontend therefore uses the same API paths locally and after deployment.

## REST API

- `GET /api/health` — verifies the PostgreSQL connection
- `GET /api/tasks` — list tasks
- `POST /api/tasks` — create a task
- `PATCH /api/tasks/:id` — update a task (including `done`)
- `DELETE /api/tasks/:id` — delete a task
- `POST /api/uploads` — accepts one `image` multipart file (up to 5 MB) and returns its Cloudinary URL

Images flow from `DropZone` to Express, where Multer validates and holds the file in memory before the server uploads it to Cloudinary. Cloudinary credentials remain server-side; the task record stores only the resulting `imageUrl`.

## Vercel deployment

Import this repository into Vercel. It will build the Vite frontend and deploy [`api/index.ts`](api/index.ts) as the Express serverless endpoint; `vercel.json` routes API subpaths to it and keeps SPA fallback for the frontend. In the Vercel project settings add the variables from `.env.example`:

- `DATABASE_URL` — Neon pooled connection string with `sslmode=require`
- `CLIENT_ORIGIN` — production frontend URL (optional when frontend and API share this Vercel project)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

Run the SQL migration once against Neon before using the deployed app.
