import type { Answer } from "@prisma/client";
import type { AnswerDto } from "database/dto";
import prisma from "database/prisma";

export class AnswerRepository {
  static async create(answer: AnswerDto) {
    return await prisma.answer.create({
      data: answer,
    });
  }

  static async bulkCreate(answers: AnswerDto[]): Promise<Answer[]> {
    return await prisma.answer.createManyAndReturn({
      data: answers,
    });
  }

  static async findById(id: number): Promise<Answer> {
    return await prisma.answer.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }
}
