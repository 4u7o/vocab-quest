import type { AnswerType, QuestionType } from "@prisma/client";

export interface QuestionDto {
  type: QuestionType;
  content: string;
  hint: string | null;
  explanation: string | null;
  textId: number | null;
  wordId: number | null;
  answerType: AnswerType;
}
