/*
  Warnings:

  - A unique constraint covering the columns `[postId,userProfileId]` on the table `Participation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Participation_postId_userProfileId_key` ON `Participation`(`postId`, `userProfileId`);
