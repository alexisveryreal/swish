import { describe, expect, test, spyOn } from "bun:test";
import { swish } from "../src/index.ts";
import { Elysia } from "elysia";

describe("Swish", () => {
  test("logs correct messages", async () => {
    // Mock `console.log` to capture its calls
    const logMock = spyOn(console, "log").mockImplementation(() => {});

    const app = new Elysia()
      .use(swish({ level: "verbose", gargles: { colors: false } }))
      .get("/", () => "hi");

    const response = await app
      .handle(new Request("http://localhost/"))
      .then((res) => res.text());

    expect(logMock.mock.calls[0]).toEqual(["<- GET /"]);

    const secondLog = logMock.mock.calls[1][0];
    expect(secondLog).toMatch(/^-> GET \/ 200 \d+\.\d{2}$/);

    // restore console.log
    logMock.mockRestore();
  });
});
