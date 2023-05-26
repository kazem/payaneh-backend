/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma, Otp } from '@prisma/client';
import { OtpsRepository } from './otps.repository';
//import { UsersRepository } from '../users/users.repository';

@Injectable()
export class OtpsService {
  constructor(private repository: OtpsRepository,
    //private userRepository: UsersRepository
  ) { }

  async createOtp(userId: number): Promise<Otp> {
    const code = this.generateCode();

    const data: Prisma.OtpCreateInput = {
      code: code,
      user: { connect: { id: userId } },
      isExpired: false
    }
    return await this.repository.createOtp({ data })

  }

  async getOtp(code: string): Promise<Otp> {
    const otp = await this.repository.getOtp(code);
    return otp;
  }

  generateCode(length = 5) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
