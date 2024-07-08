-- CreateTable
CREATE TABLE `Admin` (
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `username` VARCHAR(100) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    `jkel` VARCHAR(100) NULL,
    `tgl_lahir` VARCHAR(100) NULL,
    `alamat` VARCHAR(100) NULL,
    `ktp` VARCHAR(100) NULL,
    `kode_pos` VARCHAR(100) NULL,
    `token` VARCHAR(100) NULL,
    `id_admin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kota` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_kota` VARCHAR(100) NOT NULL,
    `about` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `id_admin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destination` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_destination` VARCHAR(100) NOT NULL,
    `about` VARCHAR(100) NOT NULL,
    `id_kota` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hotel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_hotel` VARCHAR(100) NOT NULL,
    `about` VARCHAR(100) NOT NULL,
    `alamat` VARCHAR(100) NOT NULL,
    `price` VARCHAR(100) NOT NULL,
    `id_destination` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `id_booking` INTEGER NOT NULL AUTO_INCREMENT,
    `check_in` DATETIME(3) NOT NULL,
    `check_out` DATETIME(3) NOT NULL,
    `price` VARCHAR(100) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `id_hotel` INTEGER NOT NULL,

    PRIMARY KEY (`id_booking`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kota` ADD CONSTRAINT `kota_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `Admin`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `destination` ADD CONSTRAINT `destination_id_kota_fkey` FOREIGN KEY (`id_kota`) REFERENCES `kota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hotel` ADD CONSTRAINT `hotel_id_destination_fkey` FOREIGN KEY (`id_destination`) REFERENCES `destination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_id_hotel_fkey` FOREIGN KEY (`id_hotel`) REFERENCES `hotel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_username_fkey` FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
