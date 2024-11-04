/*
  Warnings:

  - You are about to drop the column `created_At` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `trust_score` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_At` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_tag_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `created_At`,
    DROP COLUMN `tag`,
    DROP COLUMN `trust_score`,
    DROP COLUMN `updated_At`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `published` BOOLEAN NULL DEFAULT false,
    `authorId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
