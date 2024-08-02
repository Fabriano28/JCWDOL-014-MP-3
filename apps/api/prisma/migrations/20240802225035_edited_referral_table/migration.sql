/*
  Warnings:

  - You are about to drop the column `isVerified` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referral_code]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `isVerified`;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_referral_code_key` ON `Referral`(`referral_code`);
