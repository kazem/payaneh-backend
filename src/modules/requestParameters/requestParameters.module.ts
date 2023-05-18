/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { RequestParametersRepository } from './requestParameters.repository';
import { RequestParametersService } from './requestParameters.service';

@Module({
    imports: [PrismaModule],
    providers: [RequestParametersRepository, RequestParametersService],
    exports: [RequestParametersService]
})
export class RequestParametersModule { }