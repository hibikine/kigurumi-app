-- DropForeignKey
ALTER TABLE `Program` DROP FOREIGN KEY `Program_eventId_fkey`;

-- AlterTable
ALTER TABLE `Program` MODIFY `eventId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Program` ADD CONSTRAINT `Program_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
