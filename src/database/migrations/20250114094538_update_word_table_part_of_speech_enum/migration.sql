-- AlterEnum
ALTER TYPE "PartOfSpeech" ADD VALUE 'prefix';

-- AlterTable
ALTER TABLE "Word" ALTER COLUMN "partOfSpeech" DROP NOT NULL;
