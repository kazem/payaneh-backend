/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private repository: UsersRepository) { }

    async createUser(username) {
        const user: Prisma.UserCreateInput = {
            telegramUsername: '',
            isEnabled: true,
            isVerified: false,
            username: username
        }
        const userCreateInput = await this.repository.createUser({ data: user });
        return userCreateInput;
    }

    async getUser(username: string) {
        const user = await this.repository.getUser(username);
        return user;
    }

    async updateUser(data: Prisma.UserUpdateInput, userId: number) {
        const userUpdateInput = await this.repository.updateUser(data, userId);
        return userUpdateInput;
    }
}