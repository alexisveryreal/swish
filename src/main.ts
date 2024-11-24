import { Elysia } from "elysia";
import { swish } from "./index.ts";

const app = new Elysia()
  .use(swish())
  .get("/", () => {
    return {
      yo: "world",
    };
  })
  .post("/", () => {
    return {
      yo: "post",
    };
  })
  .delete("/", () => {
    return {
      na: "deelte",
    };
  })
  .put("/", () => {
    return {
      bruh: "put",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
