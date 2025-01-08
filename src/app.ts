import { App } from "@slack/bolt";
import { config } from "config";
import { errorHandler } from "bot/middlewares/error-handle.middleware";
import { channelHandler } from "bot/commands/channel";

const app = new App({
  signingSecret: config.SLACK_SIGNING_SECRET,
  token: config.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: config.SLACK_APP_TOKEN,
});

app.use(errorHandler);
app.command("/channel", channelHandler);
await app.start();
console.log("⚡️ Bolt app is running!");
