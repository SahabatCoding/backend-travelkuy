/*
  Warnings:

  - You are about to drop the column `id_kota` on the `destination` table. All the data in the column will be lost.
  - The primary key for the `kota` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `kota` table. All the data in the column will be lost.
  - You are about to drop the column `id_admin` on the `kota` table. All the data in the column will be lost.
  - Added the required column `nm_kota` to the `destination` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `destination` DROP FOREIGN KEY `destination_id_kota_fkey`;

-- DropForeignKey
ALTER TABLE `kota` DROP FOREIGN KEY `kota_id_admin_fkey`;

-- AlterTable
ALTER TABLE `destination` DROP COLUMN `id_kota`,
    ADD COLUMN `nm_kota` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `kota` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `id_admin`,
    ADD PRIMARY KEY (`nm_kota`);

-- AddForeignKey
ALTER TABLE `destination` ADD CONSTRAINT `destination_nm_kota_fkey` FOREIGN KEY (`nm_kota`) REFERENCES `kota`(`nm_kota`) ON DELETE RESTRICT ON UPDATE CASCADE;
