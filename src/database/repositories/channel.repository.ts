import type { ChannelDto } from "database/dto";
import prisma from "database/prisma";

export class ChannelRepository {
  static async create(channel: ChannelDto) {
    return await prisma.channel.create({
      data: channel,
    });
  }

  static async findManyActive() {
    return await prisma.channel.findMany({
      where: {
        isActive: {
          equals: true,
        },
      },
    });
  }
}
