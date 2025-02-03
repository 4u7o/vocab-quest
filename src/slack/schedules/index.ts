import { CronJob } from "cron";
import { dailyChallenge } from "./daily.schedule";

export const registerSchedule = () => {
  CronJob.from({
    // Every day from Monday to Friday, 8:30 - 17:30 (Trigger once after 4 hours)
    // cronTime: "0 30 8-17/4 * * 1-5",
    cronTime: "0 */3 * * * *",
    onTick: async function () {
      await dailyChallenge();
    },
    timeZone: "Asia/Ho_Chi_Minh",
    start: true,
  });

  CronJob.from({
    // Every Monday at 8:00 AM.
    cronTime: "0 0 8 * * 1",
    onTick: function () {
      // TODO Weekly Announcement for last week learning ranking.
    },
    timeZone: "Asia/Ho_Chi_Minh",
    start: true,
  });
};
