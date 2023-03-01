-- DropForeignKey
ALTER TABLE `BacklogItem` DROP FOREIGN KEY `BacklogItem_productBacklogId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_backlogItemId_fkey`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_backlogItemId_fkey` FOREIGN KEY (`backlogItemId`) REFERENCES `BacklogItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BacklogItem` ADD CONSTRAINT `BacklogItem_productBacklogId_fkey` FOREIGN KEY (`productBacklogId`) REFERENCES `ProductBacklog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
