/*
  Warnings:

  - You are about to alter the column `nm_kota` on the `destination` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- DropForeignKey
ALTER TABLE `destination` DROP FOREIGN KEY `destination_nm_kota_fkey`;

-- AlterTable
ALTER TABLE `destination` MODIFY `nm_kota` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `destination` ADD CONSTRAINT `destination_nm_kota_fkey` FOREIGN KEY (`nm_kota`) REFERENCES `kota`(`nm_kota`) ON DELETE RESTRICT ON UPDATE CASCADE;
