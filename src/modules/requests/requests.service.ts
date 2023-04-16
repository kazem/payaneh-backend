/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, Requests } from '@prisma/client';
import { RequestsRepository } from './requests.repository';

@Injectable()
export class RequestService {
    constructor(private repository: RequestsRepository) { }


    async getRequestUserByParameter(requestParameterId: number, userId: number): Promise<Requests> {
        return await this.repository.getRequestUserByParameter(requestParameterId, userId)
    }

    async createRequest(requestParameterId: number, userId: number, fromTime: string, toTime: string, startNotif: string, endNotif: string): Promise<Requests> {
        const data: Prisma.RequestsCreateInput = {
            requestParameter: {
                connect: { id: requestParameterId }
            },
            user: {
                connect: { id: userId }
            },
            fromTime: fromTime,
            toTime: toTime,
            startNotificationAt: startNotif,
            endNotificationAt: endNotif
        };
        return await this.repository.createRequest(data)
    }

}