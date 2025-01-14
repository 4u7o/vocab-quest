import type { AnswerType } from "@prisma/client";

export interface AnswerDto {
  questionId: number;
  content: string;
  isCorrect: boolean;
  explanation: string | null;
  sound: string | null;
  image: string | null;
  type: AnswerType;
}
