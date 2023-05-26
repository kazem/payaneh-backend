/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Otp, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class OtpsRepository {
    constructor(private prisma: PrismaService) { }

    async createOtp(params: { data: Prisma.OtpCreateInput }): Promise<Otp> {
        const { data } = params;
        return this.prisma.otp.create({ data });
    }

    async getLastUserOtp(userId) {
        return this.prisma.otp.findFirst({
            where: {
                userId: { equals: userId }
            },
            orderBy: {
                createdAt: 'desc'
            }
        }
        )
    }

    async getOtp(code) {
        return this.prisma.otp.findFirst({
            where: {
                code: { equals: code }
            },
            orderBy: {
                createdAt: 'desc'
            }
        }
        )
    }
}