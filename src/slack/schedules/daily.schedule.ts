import app from "app";
import { ChannelRepository } from "database/repositories";
import { QuestionService } from "services/question.service";
import {
  Actions,
  Divider,
  Header,
  Md,
  Message,
  Option,
  Section,
  StaticSelect,
} from "slack-block-builder";
import { mapToAlphabetKeys } from "utils";

// 1. Lấy tất cả những channel phù hợp (isActive) để có thể gửi câu hỏi.
// 1.1. Nếu chưa có channel nào đang bật thì tắt.
// 2. Lấy một câu hỏi random ở trong ngân hàng câu hỏi.
// 3. Lưu câu hỏi vừa lấy ra vào trong DailyChallenge (Để tracking sau này)
// 4. Tạo message template (Text box mà sẽ hiện ra trên slack)
// 5. Lặp qua danh sách các kênh hoạt động, gửi câu hỏi vào các kênh đó.
// [Optional] 6. Lấy timestamp của kết quả, lưu lại. Đăng ký 1 process để xóa select box sau 10 phút

export const dailyChallenge = async () => {
  const currentTimestamp = Date.now().toString();

  const activeChannels = await ChannelRepository.findManyActive();

  if (!activeChannels.length) return;

  const randomQuestion = await QuestionService.generateDailyQuestion(currentTimestamp);

  const alphabetMap = mapToAlphabetKeys(randomQuestion.answers);
  const messageTemplate = Message()
    .text("Daily Quizz")
    .blocks(
      Header().text("➫ ᴅᴀɪʟʏ ᴇɴɢʟɪsʜ ǫᴜɪᴢ 🏴"),
      Divider(),
      Section().text(Md.bold(`${randomQuestion.question.content}`)),
      Section().text(
        Md.listBullet(
          Array.from(alphabetMap.keys()).map((key) =>
            Md.italic(`${key}. ${alphabetMap.get(key)?.content}`),
          ),
        ),
      ),
      Divider(),
      Actions().elements(
        StaticSelect()
          .actionId("dailyChallengeSubmitAction")
          .placeholder("Select an answer")
          .options(
            Array.from(
              alphabetMap.keys().map((key) =>
                Option()
                  .text(`${key}`)
                  .value(`${randomQuestion.question.id}:::${alphabetMap.get(key)?.id.toString()}`),
              ),
            ),
          ),
      ),
    );

  for (const channel of activeChannels) {
    app.client.chat.postMessage(messageTemplate.channel(channel.channelId).buildToObject());
  }
};
