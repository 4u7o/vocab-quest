import type { Middleware, SlackActionMiddlewareArgs } from "@slack/bolt";

export const dailyChallengeSubmitActionHandler: Middleware<SlackActionMiddlewareArgs> = async ({
  body,
  payload,
}) => {
  // 1. Lấy thông tin của user vừa trả lời trong database (nếu chưa có thì tạo mới)
  // 2. Kiểm tra xem user hiện tại đã trả lời câu hỏi này chưa?
  // 2.1. Nếu rồi, thì trả lỗi message (chỉ người đó thấy)
  // 3. Tính điểm [CHỗ này nên tạo 1 công thức chung]
  // 4. Lưu lại thông tin câu trả lời của user vào 2 table (DailyResponse & UserAnswer)
  // 5. Lưu điểm số của người dùng vào trong database.
  // 6. Kiểm tra streak, nếu chưa có hôm nay thì thêm.
};
