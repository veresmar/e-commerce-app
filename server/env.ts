import dotenv from "dotenv";

// Neon CLI writes linked-branch credentials to .env.local. Local .env values
// remain useful for manually supplied Cloudinary credentials.
dotenv.config({ path: ".env.local" });
dotenv.config();
