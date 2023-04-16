/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private repository: UsersRepository) { }

    async createUser(data) {
        const user: Prisma.UserCreateInput = {
            telegramUsername: data.telegramUsername,
            isEnabled: true,
            isVerified: false,
        }
        const userCreateInput = await this.repository.createUser({ data: { ...user } });
        return userCreateInput;
    }

}