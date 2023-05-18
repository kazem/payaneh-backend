/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RequestsRepository } from './requests.repository';
import { RequestService } from './requests.service';

@Module({
    imports: [PrismaModule],
    providers: [RequestsRepository, RequestService],
    exports: [RequestService]
})
export class RequestsModule { }