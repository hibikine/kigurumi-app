-- CreateTable
CREATE TABLE `FcmToken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastUsed` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FcmToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_ja_0900_as_cs_ks;

-- AddForeignKey
ALTER TABLE `FcmToken` ADD CONSTRAINT `FcmToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
