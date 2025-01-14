import type { Word } from "@prisma/client";
import type { WordDto } from "database/dto";
import prisma from "database/prisma";

export class WordRepository {
  static async create(word: WordDto): Promise<Word> {
    return await prisma.word.create({
      data: word,
    });
  }

  static async findById(id: number): Promise<Word> {
    return await prisma.word.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }
}
