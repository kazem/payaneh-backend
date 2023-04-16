/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, RequestParameters } from '@prisma/client';
import { RequestParametersRepository } from './requestParameters.repository';

@Injectable()
export class RequestParametersService {
    constructor(private repository: RequestParametersRepository) { }

    // async createUser(data) {
    //     const user: Prisma.UserCreateInput = {
    //         telegramUsername: data.telegramUsername,
    //         isEnabled: true,
    //         isVerified: false,
    //     }
    //     const userCreateInput = await this.repository.createUser({ data: { ...user } });
    //     return userCreateInput;
    // }

    async getRequestParameter(destination: string, source: string, date: string): Promise<RequestParameters> {
        const requestParameter = await this.repository.getRequestParameter(destination, source, date);
        return requestParameter;
    }

    async createRequestParameter(destination: string, source: string, date: string): Promise<RequestParameters> {
        const ticketDateShamsi = new Date((typeof date === "string" ? new Date(date) : date).toLocaleDateString("en-US", { timeZone: 'IRAN' })).toLocaleDateString('fa-IR-u-nu-latn')
        const data: Prisma.RequestParametersCreateInput = {
            destination: destination,
            source: source,
            date: ticketDateShamsi,
            dateUtc: date,
            isEnabled: true
        };
        const requestParameter = await this.repository.createRequestParameter(data);
        return requestParameter;
    }

}