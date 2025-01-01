import { App } from "@slack/bolt";
import { errorHandler } from "middlewares/ErrorHandler";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.use(errorHandler);

app.message(":wave:", async ({ message, say }) => {
  if ("user" in message) {
    await say(`Hello, <@${message.user}>!`);
  }
});

await app.start();

console.log(await app.client.users.list({ limit: 10 }));
console.log("⚡️ Bolt app is running!");
