/*
  Warnings:

  - You are about to drop the `NotificationUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayanehRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayanehRequestResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TicketRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TicketRequestTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotificationUser" DROP CONSTRAINT "NotificationUser_payanehRequestResultId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationUser" DROP CONSTRAINT "NotificationUser_userRequestId_fkey";

-- DropForeignKey
ALTER TABLE "PayanehRequest" DROP CONSTRAINT "PayanehRequest_ticketRequestId_fkey";

-- DropForeignKey
ALTER TABLE "PayanehRequestResult" DROP CONSTRAINT "PayanehRequestResult_payanehRequestId_fkey";

-- DropForeignKey
ALTER TABLE "PayanehRequestResult" DROP CONSTRAINT "PayanehRequestResult_ticketRequestTimeId_fkey";

-- DropForeignKey
ALTER TABLE "TicketRequestTime" DROP CONSTRAINT "TicketRequestTime_ticketRequestId_fkey";

-- DropForeignKey
ALTER TABLE "UserRequest" DROP CONSTRAINT "UserRequest_ticketRequestTimeId_fkey";

-- DropForeignKey
ALTER TABLE "UserRequest" DROP CONSTRAINT "UserRequest_userId_fkey";

-- DropTable
DROP TABLE "NotificationUser";

-- DropTable
DROP TABLE "PayanehRequest";

-- DropTable
DROP TABLE "PayanehRequestResult";

-- DropTable
DROP TABLE "TicketRequest";

-- DropTable
DROP TABLE "TicketRequestTime";

-- DropTable
DROP TABLE "UserRequest";

-- CreateTable
CREATE TABLE "RequestParameters" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "dateUtc" TIMESTAMP(3) NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RequestParameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "startNotificationAt" TIMESTAMP(3) NOT NULL,
    "endNotificationAt" TIMESTAMP(3) NOT NULL,
    "status" "UserRequestStatus" NOT NULL DEFAULT 'NOT_AVAILABLE',
    "requestParameterId" INTEGER NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayanehRequests" (
    "id" BIGSERIAL NOT NULL,
    "requestParameterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayanehRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayanehResponses" (
    "id" BIGSERIAL NOT NULL,
    "payanehRequestId" BIGINT NOT NULL,
    "time" TIME(0) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayanehResponses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" BIGSERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "payanehResponseId" BIGINT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Requests_requestParameterId_key" ON "Requests"("requestParameterId");

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_requestParameterId_fkey" FOREIGN KEY ("requestParameterId") REFERENCES "RequestParameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayanehRequests" ADD CONSTRAINT "PayanehRequests_requestParameterId_fkey" FOREIGN KEY ("requestParameterId") REFERENCES "RequestParameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayanehResponses" ADD CONSTRAINT "PayanehResponses_payanehRequestId_fkey" FOREIGN KEY ("payanehRequestId") REFERENCES "PayanehRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_payanehResponseId_fkey" FOREIGN KEY ("payanehResponseId") REFERENCES "PayanehResponses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
