import type { Question } from "@prisma/client";
import type { QuestionDto } from "database/dto";
import prisma from "database/prisma";

export class QuestionRepository {
  static async create(question: QuestionDto) {
    return await prisma.question.create({
      data: question,
    });
  }

  static async findById(id: number): Promise<Question> {
    return await prisma.question.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }

  static async findOneRandomExclude(excludedQuestionIds: number[]) {
    const questionTake = 1 + excludedQuestionIds.length;
    const questionCount = await prisma.question.count();
    const skip = Math.max(0, Math.floor(Math.random() * questionCount) - questionTake);
    return await prisma.question.findFirstOrThrow({
      take: questionTake,
      skip: skip,
      where: {
        id: {
          notIn: excludedQuestionIds,
        },
      },
    });
  }
}
