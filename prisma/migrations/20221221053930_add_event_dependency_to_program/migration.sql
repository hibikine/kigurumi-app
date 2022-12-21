/*
  Warnings:

  - Added the required column `eventId` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Program` ADD COLUMN `eventId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Program` ADD CONSTRAINT `Program_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
