/*
  Warnings:

  - You are about to drop the column `referral_code` on the `referral` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Referral_referral_code_key` ON `referral`;

-- AlterTable
ALTER TABLE `referral` DROP COLUMN `referral_code`;
