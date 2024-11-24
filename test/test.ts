import { describe, expect, test } from "bun:test";
import { swish } from "../src/index.ts";
import { Elysia } from "elysia";

describe("Swish", () => {
  test("returns log", async () => {
    const app = new Elysia().use(swish()).get("/", () => "h1");

    const response = await app
      .handle(new Request("http://localhost/"))
      .then((res) => res.text());
  });
});
