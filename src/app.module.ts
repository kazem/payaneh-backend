/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { RequestsModule } from './modules/requests/requests.module'
import { RequestParametersModule } from './modules/requestParameters/requestParameters.module'
import { ApiModule } from './api/api.module';
import { OtpsModule } from './modules/otps/otps.module';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    UsersModule,
    ApiModule,
    RequestsModule,
    RequestParametersModule,
    OtpsModule,
    TelegrafModule.forRoot({
      token: '6297958328:AAFBRom0iRAh2wiH7ZKUBW0EOiNKl0Q8a0o',
    })
  ],
  providers: [AppService]
})
export class AppModule { }
