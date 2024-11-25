/**
 * This module provides functionality to add colors to logs based on the HTTP method.
 *
 * By default, the color scheme is:
 * - `GET`: Blue
 * - `POST`: Green
 * - `DELETE`: Red
 * - `PUT`: Yellow
 *
 * It uses the `@hikyu/colors` package for applying colors to text.
 *
 * @module
 * @requires @hikyu/colors
 *
 * @example
 * ```ts
 * import { Elysia } from 'elysia';
 * import { swish } from '@flosswash/swish';
 *
 * const app = new Elysia()
 *   .use(swish({ colors: true }))
 *   .get("/", () => "hi");
 * ```
 */

import { white, blue, green, red, yellow } from "@hikyu/colors";

/**
 * Logs a message with a color corresponding to the provided HTTP method.
 *
 * @param {string} message - The message to be logged.
 * @param {string} method - The HTTP method (e.g., "GET", "POST", "DELETE", "PUT").
 * @returns {void}
 *
 * @example
 * ```ts
 * colorLog("Fetching data...", "GET"); // Logs in blue
 * colorLog("Creating a resource...", "POST"); // Logs in green
 * ```
 */
export const colorLog = (message: string, method: string) => {
  let color = white;
  switch (method) {
    case "GET":
      color = blue;
      break;
    case "POST":
      color = green;
      break;
    case "DELETE":
      color = red;
      break;
    case "PUT":
      color = yellow;
      break;
  }
  console.log(color(message));
};
