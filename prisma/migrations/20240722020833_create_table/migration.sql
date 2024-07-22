-- CreateTable
CREATE TABLE "Admin" (
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "user" (
    "username" VARCHAR(100) NOT NULL,
    "full_name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "jkel" VARCHAR(100),
    "tgl_lahir" VARCHAR(100),
    "alamat" VARCHAR(100),
    "ktp" VARCHAR(100),
    "kode_pos" VARCHAR(100),
    "token" VARCHAR(100),

    CONSTRAINT "user_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "kota" (
    "nm_kota" VARCHAR(100) NOT NULL,
    "about" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,

    CONSTRAINT "kota_pkey" PRIMARY KEY ("nm_kota")
);

-- CreateTable
CREATE TABLE "destination" (
    "id" SERIAL NOT NULL,
    "nm_destination" VARCHAR(100) NOT NULL,
    "about" VARCHAR(100) NOT NULL,
    "nm_kota" VARCHAR(100) NOT NULL,

    CONSTRAINT "destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel" (
    "id" SERIAL NOT NULL,
    "nm_hotel" VARCHAR(100) NOT NULL,
    "about" VARCHAR(100) NOT NULL,
    "alamat" VARCHAR(100) NOT NULL,
    "price" VARCHAR(100) NOT NULL,
    "id_destination" INTEGER NOT NULL,

    CONSTRAINT "hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id_booking" SERIAL NOT NULL,
    "check_in" TIMESTAMP(3) NOT NULL,
    "check_out" TIMESTAMP(3) NOT NULL,
    "price" VARCHAR(100) NOT NULL,
    "username" TEXT NOT NULL,
    "id_hotel" INTEGER NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id_booking")
);

-- AddForeignKey
ALTER TABLE "destination" ADD CONSTRAINT "destination_nm_kota_fkey" FOREIGN KEY ("nm_kota") REFERENCES "kota"("nm_kota") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel" ADD CONSTRAINT "hotel_id_destination_fkey" FOREIGN KEY ("id_destination") REFERENCES "destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_id_hotel_fkey" FOREIGN KEY ("id_hotel") REFERENCES "hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_username_fkey" FOREIGN KEY ("username") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
