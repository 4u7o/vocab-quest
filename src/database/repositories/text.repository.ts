import type { Text } from "@prisma/client";
import type { TextDto } from "database/dto";
import prisma from "database/prisma";

export class TextRepository {
  static async create(text: TextDto) {
    return await prisma.text.create({
      data: text,
    });
  }

  static async findById(id: number): Promise<Text> {
    return await prisma.text.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }
}
