import type { Answer, AnswerType, Question } from "@prisma/client";
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

  static async findManyByQuestion(question: Question, answerTake: number = 4) {
    const answerType: AnswerType = question.answerType;
    const answers: Answer[] = [];

    // Get correct Answer
    const correctAnswer = await prisma.answer.findFirstOrThrow({
      where: {
        questionId: {
          equals: question.id,
        },
      },
    });
    answers.push(correctAnswer);

    // Get ditracted answers
    const answerCount = await prisma.answer.count();
    const skip = Math.max(0, Math.floor(Math.random() * answerCount) - answers.length);
    const distractedAnswers = await prisma.answer.findMany({
      take: answerTake - answers.length,
      skip: skip,
      where: {
        id: {
          notIn: [correctAnswer.id],
        },
        type: {
          equals: answerType,
        },
      },
    });
    answers.push(...distractedAnswers);
    return answers;
  }
}
