import { AppError, ErrorStatus } from "errors";
import type { Config } from "types/config";

export const loadConfig = (): Config => {
  const getEnv = <T>(key: string, parser?: (value: string) => T, defaultValue?: T): T => {
    const value = process.env[key];
    if (value === undefined) {
      if (defaultValue !== undefined) return defaultValue;
      throw new AppError(
        `Missing environment variable ${key}`,
        ErrorStatus.CONFIGURATION_ERROR,
        "ConfigError",
      );
    }

    if (parser) {
      try {
        return parser(value);
      } catch (_) {
        throw new AppError(
          `Invalid value for environment variable ${key}: ${value}`,
          ErrorStatus.CONFIGURATION_ERROR,
          "ConfigError",
        );
      }
    }

    return value as unknown as T;
  };

  return {
    SLACK_SIGNING_SECRET: getEnv("SLACK_SIGNING_SECRET"),
    SLACK_BOT_TOKEN: getEnv("SLACK_BOT_TOKEN"),
    SLACK_APP_TOKEN: getEnv("SLACK_APP_TOKEN"),
    NODE_ENV: getEnv("NODE_ENV", (value) => {
      if (value !== "development" && value !== "production" && value !== "test") {
        throw new AppError(
          `Invalid value for environment variable NODE_ENV: ${value}`,
          ErrorStatus.CONFIGURATION_ERROR,
          "ConfigError",
        );
      }
      return value as "development" | "production" | "test";
    }),
    PORT: getEnv("PORT", (value) => parseInt(value, 10), 3000),
  };
};
