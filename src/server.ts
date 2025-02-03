import app from "app";
import { registerSchedule } from "slack/schedules";

(async () => {
  try {
    await app.start();
    console.log("⚡️ Slack bot is running!");

    registerSchedule();
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
})();
