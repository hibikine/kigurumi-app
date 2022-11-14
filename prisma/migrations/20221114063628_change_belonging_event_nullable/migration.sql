-- DropForeignKey
ALTER TABLE `Belonging` DROP FOREIGN KEY `Belonging_eventId_fkey`;

-- AlterTable
ALTER TABLE `Belonging` MODIFY `eventId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Belonging` ADD CONSTRAINT `Belonging_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
