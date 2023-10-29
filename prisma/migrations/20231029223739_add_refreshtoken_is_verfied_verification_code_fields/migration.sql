-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "hashedRefreshToken" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationCode" TEXT;
