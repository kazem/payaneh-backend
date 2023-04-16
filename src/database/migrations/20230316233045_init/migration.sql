-- CreateEnum
CREATE TYPE "UserRequestStatus" AS ENUM ('NOT_AVAILABLE', 'AVAILABLE', 'Canceled', 'Expired');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramUsername" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "isExpired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "startNotificationAt" TIMESTAMP(3) NOT NULL,
    "endNotificationAt" TIMESTAMP(3) NOT NULL,
    "status" "UserRequestStatus" NOT NULL DEFAULT 'NOT_AVAILABLE',
    "ticketRequestTimeId" INTEGER NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketRequest" (
    "id" SERIAL NOT NULL,
    "srcCity" TEXT NOT NULL,
    "destCity" TEXT NOT NULL,
    "ticketDate" TEXT NOT NULL,
    "ticketDateUtc" TIMESTAMP(3) NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TicketRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketRequestTime" (
    "id" SERIAL NOT NULL,
    "ticketRequestId" INTEGER NOT NULL,
    "tikectTime" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT false,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TicketRequestTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayanehRequest" (
    "id" BIGSERIAL NOT NULL,
    "ticketRequestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayanehRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayanehRequestResult" (
    "id" BIGSERIAL NOT NULL,
    "ticketRequestTimeId" INTEGER NOT NULL,
    "payanehRequestId" BIGINT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PayanehRequestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationUser" (
    "id" BIGSERIAL NOT NULL,
    "userRequestId" INTEGER NOT NULL,
    "payanehRequestResultId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRequest_ticketRequestTimeId_key" ON "UserRequest"("ticketRequestTimeId");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRequest" ADD CONSTRAINT "UserRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRequest" ADD CONSTRAINT "UserRequest_ticketRequestTimeId_fkey" FOREIGN KEY ("ticketRequestTimeId") REFERENCES "TicketRequestTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketRequestTime" ADD CONSTRAINT "TicketRequestTime_ticketRequestId_fkey" FOREIGN KEY ("ticketRequestId") REFERENCES "TicketRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayanehRequest" ADD CONSTRAINT "PayanehRequest_ticketRequestId_fkey" FOREIGN KEY ("ticketRequestId") REFERENCES "TicketRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayanehRequestResult" ADD CONSTRAINT "PayanehRequestResult_ticketRequestTimeId_fkey" FOREIGN KEY ("ticketRequestTimeId") REFERENCES "TicketRequestTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayanehRequestResult" ADD CONSTRAINT "PayanehRequestResult_payanehRequestId_fkey" FOREIGN KEY ("payanehRequestId") REFERENCES "PayanehRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationUser" ADD CONSTRAINT "NotificationUser_userRequestId_fkey" FOREIGN KEY ("userRequestId") REFERENCES "UserRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationUser" ADD CONSTRAINT "NotificationUser_payanehRequestResultId_fkey" FOREIGN KEY ("payanehRequestResultId") REFERENCES "PayanehRequestResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
