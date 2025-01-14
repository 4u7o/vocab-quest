/*
  Warnings:

  - Added the required column `type` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WordType" AS ENUM ('word', 'prefix', 'suffix');

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "type" "WordType" NOT NULL;
