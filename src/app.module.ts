/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [UsersModule, ApiModule],
})
export class AppModule { }
