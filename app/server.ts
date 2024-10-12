// app/server.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import userRouters from "./user/api";

interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

const app = new Hono();
app.use("/*", cors());

/*
API
*/
app.route("/api/user", userRouters);

app.get("/api/hello-world", async (c) => {
  return c.text("Hello World!");
});

// 处理所有其他请求，返回 Vue 的打包好的静态资源
app.get("/*", async (c) => {
  const env = c.env as Env;
  return env.ASSETS.fetch(c.req.raw);
});

export default app;
