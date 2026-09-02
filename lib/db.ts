import { createClient, Client } from '@libsql/client';

let _db: Client | null = null;

export function getDb(): Client {
  if (!_db) {
    _db = createClient({
      url: process.env.TURSO_DATABASE_URL || '',
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return _db;
}

export const db = { execute: (sql: string | { sql: string; args: unknown[] }) => getDb().execute(sql as Parameters<Client['execute']>[0]) };

export async function initProductsTable() {
  await getDb().execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      currency TEXT DEFAULT 'MXN',
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
