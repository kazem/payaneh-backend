/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, Requests } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RequestsRepository {
    constructor(private prisma: PrismaService) { }

    async getRequestUserByParameter(requestParameterId: number, userId: number): Promise<Requests> {
        return this.prisma.requests.findFirst({
            where: {
                AND: {
                    requestParameterId: { equals: requestParameterId },
                    userId: { equals: userId }
                }
            }
        })
    }

    async createRequest(data: Prisma.RequestsCreateInput): Promise<Requests> {
        return this.prisma.requests.create({ data })
    }
}