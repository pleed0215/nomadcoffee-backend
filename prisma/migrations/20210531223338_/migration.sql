/*
  Warnings:

  - You are about to drop the column `latitude` on the `CoffeeShop` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `CoffeeShop` table. All the data in the column will be lost.
  - Added the required column `lat` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lng" TEXT NOT NULL;
