/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");
