// api.ts
import { Hono } from "hono";
import { saveUser, getUserById } from "./db";
import type User from "./user";
import type { D1Database } from "@cloudflare/workers-types";

const api = new Hono<{ Bindings: { DB: D1Database } }>();

api.post("/save", async (c) => {
  const user: User = await c.req.json();
  await saveUser(c.env.DB, user);
  return c.json({ success: true });
});

api.get("/detail", async (c) => {
  const id = parseInt(c.req.query("id") as string, 10);
  const user = await getUserById(c.env.DB, id);
  if (user) {
    return c.json(user);
  } else {
    return c.json({ error: "User not found" }, 404);
  }
});

export default api;
