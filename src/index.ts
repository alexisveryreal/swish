import { Elysia } from "elysia";

type SwishOptions = {
  level?: "default" | "verbose";
  gargles?: {
    timestamp?: boolean;
    prefix?: string;
  };
};

/**
 * Swish away these logs
 * @param swishOptions optional values for logging
 */
export const swish = ({
  level = "default",
  gargles = {},
}: SwishOptions = {}) => {
  const defaults: SwishOptions["gargles"] =
    level == "verbose"
      ? {
          timestamp: true,
          prefix: "VERBOSE",
        }
      : {
          timestamp: false,
          prefix: "",
        };

  const { timestamp, prefix } = { ...defaults, ...gargles };

  return new Elysia({
    name: "@flosswash/swish",
    seed: level,
  })
    .derive(({ request, path }) => {
      console.log(`<-- ${request.method} ${path}`);
    })
    .as("plugin");
};
