import { App } from "@slack/bolt";
import { config } from "config";
import { errorHandler } from "bot/middlewares/error-handle.middleware";
import { channelHandler } from "bot/commands/channel.command";
import { dailyChallengeSubmitActionHandler } from "bot/actions/daily-challenge-submit.action";

const app = new App({
  signingSecret: config.SLACK_SIGNING_SECRET,
  token: config.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: config.SLACK_APP_TOKEN,
});

// Register all application function here.

app.use(errorHandler);

app.command("/channel", channelHandler);

app.action("dailyChallengeSubmitAction", dailyChallengeSubmitActionHandler);

export default app;
