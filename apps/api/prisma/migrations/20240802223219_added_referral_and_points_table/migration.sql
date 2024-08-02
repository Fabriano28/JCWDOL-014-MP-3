/*
  Warnings:

  - You are about to drop the column `points` on the `referral` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referral_code` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `referral` DROP COLUMN `points`,
    ADD COLUMN `referral_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Points` (
    `point_id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expired_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`point_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_user_id_key` ON `Referral`(`user_id`);

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
