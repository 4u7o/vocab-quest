export interface Config {
  NODE_ENV: "development" | "production" | "test";
  SLACK_SIGNING_SECRET: string;
  SLACK_BOT_TOKEN: string;
  SLACK_APP_TOKEN: string;
  PORT: number;
}
