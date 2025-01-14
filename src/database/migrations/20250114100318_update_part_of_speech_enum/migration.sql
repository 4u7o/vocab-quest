/*
  Warnings:

  - The values [prefix] on the enum `PartOfSpeech` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PartOfSpeech_new" AS ENUM ('noun', 'verb', 'adjective', 'adverb');
ALTER TABLE "Word" ALTER COLUMN "partOfSpeech" TYPE "PartOfSpeech_new" USING ("partOfSpeech"::text::"PartOfSpeech_new");
ALTER TYPE "PartOfSpeech" RENAME TO "PartOfSpeech_old";
ALTER TYPE "PartOfSpeech_new" RENAME TO "PartOfSpeech";
DROP TYPE "PartOfSpeech_old";
COMMIT;
