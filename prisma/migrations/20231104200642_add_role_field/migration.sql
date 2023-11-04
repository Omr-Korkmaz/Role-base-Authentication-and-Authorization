/*
  Warnings:

  - Made the column `username` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropIndex
DROP INDEX "Customer_username_key";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ALTER COLUMN "username" SET NOT NULL;
