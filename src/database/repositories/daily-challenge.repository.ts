import type { DailyChallengeDto } from "database/dto";
import prisma from "database/prisma";
import dayjs from "dayjs";

export class DailyChallengeRepository {
  static async create(daily: DailyChallengeDto) {
    return await prisma.dailyChallenge.create({
      data: daily,
    });
  }

  static async findManyAfterDate(activeDate: string) {
    return await prisma.dailyChallenge.findMany({
      select: {
        questionId: true,
      },
      where: {
        activeDate: {
          gte: dayjs(activeDate).toDate(),
        },
      },
    });
  }
}
