// db.ts
import type { D1Database } from "@cloudflare/workers-types";
import type User from "./user";

export async function initializeUsersTable(DB: D1Database): Promise<void> {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      resolution VARCHAR(50),
      local_language VARCHAR(10),
      m1 VARCHAR(255),
      oaid VARCHAR(255),
      channel VARCHAR(50),
      app_version VARCHAR(20),
      app_name VARCHAR(100),
      pkg_name VARCHAR(100),
      device_id VARCHAR(100),
      platform VARCHAR(20),
      os_version VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await DB.prepare(query).run();
}

export async function saveUser(DB: D1Database, user: User): Promise<void> {
  await initializeUsersTable(DB); // Ensure the table exists
  const query = `
    INSERT INTO users (
      resolution, local_language, m1, oaid, channel, app_version, app_name, pkg_name, device_id, platform, os_version
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    user.resolution,
    user.local_language,
    user.m1,
    user.oaid,
    user.channel,
    user.app_version,
    user.app_name,
    user.pkg_name,
    user.device_id,
    user.platform,
    user.os_version
  ];
  await DB.prepare(query)
    .bind(...values)
    .run();
}

export async function getUserById(DB: D1Database, id: number): Promise<User | null> {
  const query = `SELECT * FROM users WHERE id = ?`;
  const result = await DB.prepare(query).bind(id).first<User>();
  return result || null;
}
