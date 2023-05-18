/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, RequestParameters } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class RequestParametersRepository {
    constructor(private prisma: PrismaService) { }

    async getRequestParameter(destination: string, source: string, date: string): Promise<RequestParameters> {
        console.log('getRequestParameter: ', destination);
        return this.prisma.requestParameters.findFirst({
            where: {
                AND: {
                    destination: { equals: destination },
                    source: { equals: source },
                    dateUtc: { equals: date },
                    isEnabled: { equals: true }
                }
            }
        })
    }

    async createRequestParameter(data: Prisma.RequestParametersCreateInput): Promise<RequestParameters> {
        return this.prisma.requestParameters.create({ data })
    }
}