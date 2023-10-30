/*
  Warnings:

  - Made the column `verificationCode` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "verificationCode" SET NOT NULL;
