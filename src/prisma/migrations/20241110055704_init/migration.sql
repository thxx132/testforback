/*
  Warnings:

  - You are about to drop the column `author_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `participation_date` on the `Participation` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Participation` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Participation` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `unit_quantity` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `trust_score` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `active_trades` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `introduce` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `joined_trades` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the `editTrust` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentAuthorId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupNum` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `postId` to the `Participation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userProfileId` to the `Participation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitQuantity` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadline` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Participation` DROP FOREIGN KEY `Participation_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Participation` DROP FOREIGN KEY `Participation_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserProfile` DROP FOREIGN KEY `UserProfile_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `editTrust` DROP FOREIGN KEY `editTrust_from_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `editTrust` DROP FOREIGN KEY `editTrust_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `editTrust` DROP FOREIGN KEY `editTrust_to_user_id_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `author_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `post_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `class` INTEGER NOT NULL,
    ADD COLUMN `commentAuthorId` INTEGER NOT NULL,
    ADD COLUMN `groupNum` INTEGER NOT NULL,
    ADD COLUMN `order` INTEGER NOT NULL,
    ADD COLUMN `postId` INTEGER NOT NULL,
    MODIFY `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Participation` DROP COLUMN `participation_date`,
    DROP COLUMN `post_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `participationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `postId` INTEGER NOT NULL,
    ADD COLUMN `userProfileId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `author_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `image_url`,
    DROP COLUMN `unit_quantity`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD COLUMN `unitQuantity` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `deadline` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `created_at`,
    DROP COLUMN `trust_score`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `trustScore` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ALTER COLUMN `password` DROP DEFAULT,
    ALTER COLUMN `username` DROP DEFAULT;

-- AlterTable
ALTER TABLE `UserProfile` DROP PRIMARY KEY,
    DROP COLUMN `active_trades`,
    DROP COLUMN `introduce`,
    DROP COLUMN `joined_trades`,
    DROP COLUMN `profile_image`,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nickname` VARCHAR(191) NOT NULL,
    ADD COLUMN `profileImageUrl` VARCHAR(191) NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `editTrust`;

-- CreateTable
CREATE TABLE `ParticipationCounter` (
    `postId` INTEGER NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `totalQuantity` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrustScore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fromUserProfileId` INTEGER NOT NULL,
    `toUserProfileId` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentAuthorId_fkey` FOREIGN KEY (`commentAuthorId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParticipationCounter` ADD CONSTRAINT `ParticipationCounter_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
