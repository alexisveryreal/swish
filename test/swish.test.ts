import { describe, expect, test, spyOn } from "bun:test";
import { swish } from "../src/index.ts";
import { Elysia } from "elysia";

describe("Swish", () => {
  test("logs correct messages GET", async () => {
    // Mock `console.log` to capture its calls
    const logMock = spyOn(console, "log").mockImplementation(() => {});

    const app = new Elysia()
      .use(swish({ level: "verbose", gargles: { colors: false } }))
      .get("/", async () => {
        await Bun.sleep(10);
        return "hi";
      });

    const response = await app
      .handle(new Request("http://localhost/"))
      .then((res) => res.text());

    expect(logMock.mock.calls[0]).toEqual(["<- GET /"]);

    const secondLog = logMock.mock.calls[1][0];
    expect(secondLog).toMatch(/^-> GET \/ 200 \d+\.\d{2}$/);

    // restore console.log
    logMock.mockRestore();
  });

  test("logs correct messages POST", async () => {
    const logMock = spyOn(console, "log").mockImplementation(() => {});

    const app = new Elysia()
      .use(swish({ level: "verbose", gargles: { colors: false } }))
      .post("/", async () => {
        await Bun.sleep(10);
        return "hi";
      });

    const response = await app
      .handle(new Request("http://localhost/", { method: "POST" }))
      .then((res) => res.text());

    expect(logMock.mock.calls[0]).toEqual(["<- POST /"]);

    const secondLog = logMock.mock.calls[1][0];
    expect(secondLog).toMatch(/^-> POST \/ 200 \d+\.\d{2}$/);

    // restore console.log
    logMock.mockRestore();
  });

  test("logs correct messages DELETE", async () => {
    const logMock = spyOn(console, "log").mockImplementation(() => {});

    const app = new Elysia()
      .use(swish({ level: "verbose", gargles: { colors: false } }))
      .delete("/", async () => {
        await Bun.sleep(10);
        return "hi";
      });

    const response = await app
      .handle(new Request("http://localhost/", { method: "DELETE" }))
      .then((res) => res.text());

    expect(logMock.mock.calls[0]).toEqual(["<- DELETE /"]);

    const secondLog = logMock.mock.calls[1][0];
    expect(secondLog).toMatch(/^-> DELETE \/ 200 \d+\.\d{2}$/);

    // restore console.log
    logMock.mockRestore();
  });

  test("logs correct messages PUT", async () => {
    const logMock = spyOn(console, "log").mockImplementation(() => {});

    const app = new Elysia()
      .use(swish({ level: "verbose", gargles: { colors: false } }))
      .put("/", async () => {
        await Bun.sleep(10);
        return "hi";
      });

    const response = await app
      .handle(new Request("http://localhost/", { method: "PUT" }))
      .then((res) => res.text());

    expect(logMock.mock.calls[0]).toEqual(["<- PUT /"]);

    const secondLog = logMock.mock.calls[1][0];
    expect(secondLog).toMatch(/^-> PUT \/ 200 \d+\.\d{2}$/);

    // restore console.log
    logMock.mockRestore();
  });
});
