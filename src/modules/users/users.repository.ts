/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) { }

    async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
        const { data } = params;
        return this.prisma.user.create({ data });
    }
}