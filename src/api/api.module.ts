/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { RequestsModule } from 'src/modules/requests/requests.module';
import { RequestParametersModule } from 'src/modules/requestParameters/requestParameters.module';
import { OtpsModule } from 'src/modules/otps/otps.module'
import { ApiController } from './api.controller';

@Module({
    imports: [UsersModule, RequestsModule, RequestParametersModule, OtpsModule],
    controllers: [ApiController],
})
export class ApiModule { }