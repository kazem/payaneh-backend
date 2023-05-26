/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { On, Start, Update } from 'nestjs-telegraf';
import { Context, deunionize } from 'telegraf';
import { UsersService } from 'src/modules/users/users.service';
import { OtpsService } from 'src/modules/otps/otps.service';

@Update()
@Injectable()
export class AppService {
    constructor(private readonly usersService: UsersService,
        private readonly otpsService: OtpsService) { }
    getData(): { message: string } {
        return { message: 'Welcome to server!' };
    }

    @Start()
    async startCommand(ctx: Context) {
        if (ctx.from.is_bot)
            return

        ctx.reply('برای تایید حساب کاربری خود، لطفا کد دریافتی را ارسال کنید.')

        // this.usersService.getUserByTelegramId(ctx.from.id).then(res => {
        //     if (!res) {
        //         this.usersService.createUser({ user: ctx.from }, ctx.chat.id)
        //         ctx.reply(`پس از راه‌اندازی ربات، نتایج برای شما ارسال خواهد شد.\nبرای غیر فعال کردن روی /disable کلیک کنید.`);
        //     }

        // })
    }

    // @Help()
    // async helpCommand(ctx: Context) {
    //     await ctx.reply('Send me a sticker');
    // }

    // @On('sticker')
    // async onSticker(ctx: Context) {
    //     await ctx.reply('👍');
    // }

    @On('text')
    async onText(ctx: Context) {
        console.log('ctx: ', ctx);
        const textMessage = deunionize(ctx.message)?.text
        console.log('textMessage: ', textMessage);
        if (textMessage.length === 5) {
            const otp = await this.otpsService.getOtp(textMessage)
            console.log('otp: ', otp);
            if (otp) {
                const data = {
                    chatId: ctx.message.chat.id,
                    firstName: ctx.from.first_name,
                    lastName: ctx.from.last_name,
                    telegramUsername: ctx.from.username,
                    isVerified: true,
                    isEnabled: true
                }
                const user = await this.usersService.updateUser(data, otp.userId)
                console.log('user: ', user);
                await ctx.reply("نام کاربری شما با موفقیت تایید شد.")
            }
            else {
                console.log('Invalid Code');
                await ctx.reply("کد ارسالی نامعتبر است!")
            }
        }

        else {
            console.log('ad Message');
            await ctx.reply("پیام نامشخص!")
        }
    }

    // @Hears('hi')
    // async hearsHi(ctx: Context) {
    //     // await ctx.telegram.sendMessage .reply('Hey there');
    // }

    // @Hears('/disable')
    // async deactiveUser(ctx: Context) {
    //     // this.usersService.deactiveUser(ctx.from.id).then(res => {
    //     //     ctx.reply('با موفقیت غیر فعال شد.');
    //     // })
    // }
}

// ctx.message.chat: {
//     id: 75589491,
//   first_name: 'Kazem',
//   last_name: 'Rezaie',
//   username: 'kiolin97',
//   type: 'private'
// }