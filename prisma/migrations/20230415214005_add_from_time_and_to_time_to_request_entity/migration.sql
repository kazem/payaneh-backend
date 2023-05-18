/*
  Warnings:

  - Added the required column `fromTime` to the `Requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toTime` to the `Requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requests" ADD COLUMN     "fromTime" TIME(0) NOT NULL,
ADD COLUMN     "toTime" TIME(0) NOT NULL;
