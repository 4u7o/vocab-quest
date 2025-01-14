export interface Config {
  NODE_ENV: "development" | "production" | "test";
  SLACK_SIGNING_SECRET: string;
  SLACK_BOT_TOKEN: string;
  SLACK_APP_TOKEN: string;
  PORT: number;
  ORACLE_REGION: string;
  ORACLE_BUCKET: string;
  ORACLE_BUCKET_URL: string;
  ORACLE_BUCKET_PAR_NAME: string;
  ORACLE_BUCKET_PAR_WRITE: string;
}
