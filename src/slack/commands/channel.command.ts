import type { Middleware, SlackCommandMiddlewareArgs } from "@slack/bolt";

export const channelHandler: Middleware<SlackCommandMiddlewareArgs> = async ({
  ack,
  respond,
  say,
}) => {
  await ack();

  try {
    // await checkPermission()

    // TODO: update daily channel list

    await say({
      text: ":gear: CHANNEL SETTING :gear:",
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: ":gear: CHANNEL SETTING :gear:",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: ":books: Select an operator you would like to perform!:",
          },
          accessory: {
            type: "static_select",
            placeholder: {
              type: "plain_text",
              text: "Select an item",
              emoji: true,
            },
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Add Channel",
                  emoji: true,
                },
                value: "CHANNEL.ADD",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Edit Channel",
                  emoji: true,
                },
                value: "CHANNEL.EDIT",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Remove Channel",
                  emoji: true,
                },
                value: "CHANNEL.DELETE",
              },
              {
                text: {
                  type: "plain_text",
                  text: "View Channels",
                  emoji: true,
                },
                value: "CHANNEL.VIEW",
              },
            ],
            action_id: "ACTION.CHANNEL",
          },
        },
      ],
    });
  } catch (error) {
    respond(`:exclamation: Failed to execute channel command`);
    throw error;
  }
};
