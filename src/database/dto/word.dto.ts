import type { PartOfSpeech, WordType } from "@prisma/client";

export interface WordDto {
  term: string;
  definition: string;
  partOfSpeech: PartOfSpeech | null;
  type: WordType;
  pronunciation: string | null;
  example: string | null;
  sound: string | null;
  image: string | null;
}
