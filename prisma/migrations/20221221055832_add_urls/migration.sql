-- AlterTable
ALTER TABLE `Program` ADD COLUMN `ownerUrl` VARCHAR(191) NULL,
    ADD COLUMN `url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `admin` BOOLEAN NOT NULL DEFAULT false;
