import type { User } from "@prisma/client";
import type { UserDto } from "database/dto";
import prisma from "database/prisma";

export class UserRepository {
  static async create(user: UserDto) {
    return await prisma.user.create({
      data: user,
    });
  }

  static async findById(id: number): Promise<User> {
    return await prisma.user.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }

  static async findBySlackId(slackId: string): Promise<User> {
    return await prisma.user.findUniqueOrThrow({
      where: {
        slackUserId: slackId,
      },
    });
  }
}
