/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
    imports: [PrismaModule],
    providers: [UsersRepository, UsersService],
    exports: [UsersService]
})
export class UsersModule { }