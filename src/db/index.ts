import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function createDb() {
  return drizzle(neon(process.env.DATABASE_URL!), { schema });
}

let _db: ReturnType<typeof createDb> | null = null;

// Lazy singleton: a top-level `neon()` call throws if DATABASE_URL isn't set yet,
// which would crash `next build` before env vars are configured.
export function getDb() {
  if (!_db) _db = createDb();
  return _db;
}
