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
}
