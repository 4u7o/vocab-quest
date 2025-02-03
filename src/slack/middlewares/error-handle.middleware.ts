import { AppError } from "errors";
import type { AnyMiddlewareArgs, Middleware } from "@slack/bolt";

export const errorHandler: Middleware<AnyMiddlewareArgs> = async ({
  next,
  ..._args
}: AnyMiddlewareArgs & { next?: () => Promise<void> }) => {
  try {
    if (next) {
      await next();
    }
  } catch (error) {
    if (error instanceof AppError) {
      // TODO: Handle AppError logging here
      console.error(`[${error.name}] ${error.message}`, error.metadata);
    } else {
      console.log("Unhandled Error:", error);
    }
  }
};
