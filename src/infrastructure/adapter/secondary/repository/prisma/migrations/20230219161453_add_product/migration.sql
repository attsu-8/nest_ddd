/*
  Warnings:

  - Added the required column `productBacklogId` to the `BacklogItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BacklogItem` ADD COLUMN `productBacklogId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ProductBacklog` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `productOwnerId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BacklogItem` ADD CONSTRAINT `BacklogItem_productBacklogId_fkey` FOREIGN KEY (`productBacklogId`) REFERENCES `ProductBacklog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductBacklog` ADD CONSTRAINT `ProductBacklog_productOwnerId_fkey` FOREIGN KEY (`productOwnerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
