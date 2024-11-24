/**
 * @module @flosswash/swish
 *
 * This module provides the Swish plugin for the Elysia framework. Swish enhances
 * logging capabilities by introducing colored and timestamped logs for incoming
 * requests and outgoing responses.
 *
 * ### Features:
 * - Customizable verbosity (`default` or `verbose` mode).
 * - Option to enable or disable colored logs and timestamps.
 * - Attaches a `Timer` instance to each request for precise duration tracking.
 *
 * @requires elysia - The Elysia framework to integrate with.
 *
 * @example
 * ```ts
 * import { Elysia } from "elysia";
 * import { swish } from "@flosswash/swish";
 *
 * const app = new Elysia()
 *   .use(swish({ level: "verbose", gargles: { colors: true } }))
 *   .get("/", () => "Hello, Swish!");
 *
 * app.listen(8080);
 * ```
 */

import { Elysia, type MergeSchema } from "elysia";
import { colorLog } from "./colors.ts";
import { Timer } from "./timer.ts";

/**
 * Options for configuring the Swish plugin.
 *
 * @typedef {Object} SwishOptions
 * @property {"default" | "verbose"} [level="default"] - Logging verbosity level.
 * - `"default"`: Minimal logs.
 * - `"verbose"`: Detailed logs, including timestamps.
 * @property {Object} [gargles={}] - Additional logging options.
 * @property {boolean} [gargles.timestamp=false] - Whether to include timestamps in logs.
 * @property {boolean} [gargles.colors=true] - Whether to colorize the logs.
 */
type SwishOptions = {
  level?: "default" | "verbose";
  gargles?: {
    timestamp?: boolean;
    colors?: boolean;
  };
};

/**
 * Type representing the extended Elysia instance returned by the Swish plugin.
 *
 * @typedef {Elysia} ReturnElysia
 * @property {Timer} swishTimer - A timer instance attached to each request.
 */
type ReturnElysia = Elysia<
  "",
  false,
  {
    decorator: {};
    derive: {};
    resolve: {};
    store: {};
  },
  {
    error: {};
    type: {};
  },
  {
    macro: {};
    macroFn: {};
    schema: {};
  },
  {},
  {
    derive: { readonly swishTimer: Timer };
    resolve: {};
    schema: MergeSchema<{}, {}>;
  },
  {
    derive: {};
    resolve: {};
    schema: {};
  }
>;

/**
 * Swish plugin for the Elysia framework.
 *
 * This plugin enhances Elysia applications with colored and timestamped logs,
 * depending on the configured options.
 *
 * ### Features:
 * - Logs incoming requests with their HTTP method and path.
 * - Logs outgoing responses with their HTTP status, method, and path.
 * - Optionally includes timestamps and colorized logs.
 * - Attaches a `Timer` instance to each request for precise timing.
 *
 * @function swish
 * @param {SwishOptions} [swishOptions={}] - Optional configuration for logging behavior.
 * @param {"default" | "verbose"} [swishOptions.level="default"] - Logging verbosity level.
 * @param {Object} [swishOptions.gargles={}] - Additional options for log formatting.
 * @param {boolean} [swishOptions.gargles.timestamp=false] - Whether to include timestamps in logs.
 * @param {boolean} [swishOptions.gargles.colors=true] - Whether to enable colored logs.
 * @returns {ReturnElysia} - An Elysia application extended with the Swish plugin.
 *
 * @example
 * ```ts
 * import { Elysia } from "elysia";
 * import { swish } from "@flosswash/swish";
 *
 * const app = new Elysia()
 *   .use(swish({ level: "verbose", gargles: { colors: true } }))
 *   .get("/", () => "Hello, Swish!");
 *
 * app.listen(8080);
 * ```
 */
export const swish = ({
  level = "default",
  gargles = {},
}: SwishOptions = {}): ReturnElysia => {
  const defaults: SwishOptions["gargles"] =
    level == "verbose"
      ? {
          timestamp: true,
          colors: true,
        }
      : {
          timestamp: false,
          colors: true,
        };

  const { timestamp, colors } = { ...defaults, ...gargles };

  return new Elysia({
    name: "@flosswash/swish",
    seed: level,
  })
    .derive(({ request, path }) => {
      const timer = new Timer();
      timer.start();
      const log = `<- ${request.method} ${path}`;
      colors ? colorLog(log, request.method) : console.log(log);

      return {
        swishTimer: timer,
      };
    })
    .onAfterResponse(({ request, path, swishTimer, set }) => {
      const endTime = swishTimer.end().toFixed(2);
      const base = `-> ${request.method} ${path} ${set.status}`;
      const log = `${base} ${timestamp ? endTime : ""}`;
      colors ? colorLog(log, request.method) : console.log(log);
    })
    .as("plugin");
};
