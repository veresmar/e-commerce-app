CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title TEXT NOT NULL CHECK (char_length(trim(title)) > 0), description TEXT NOT NULL DEFAULT '',
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')), category TEXT NOT NULL CHECK (category IN ('work', 'personal', 'home')),
  date DATE NOT NULL, image_url TEXT, done BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS tasks_date_idx ON tasks (date);
