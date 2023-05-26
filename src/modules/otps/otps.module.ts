/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OtpsService } from './otps.service';
import { OtpsRepository } from './otps.repository'
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OtpsService, OtpsRepository],
  exports: [OtpsService]
})
export class OtpsModule { }
