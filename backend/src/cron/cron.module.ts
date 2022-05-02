import { MailerModule } from '@nestjs-modules/mailer';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CoreModule } from 'src/core/core.module';
import { CronService } from './cron.service';

const { MAIL_ID, MAIL_PASS } = process.env;

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    CoreModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: MAIL_ID,
          pass: MAIL_PASS
        },
      },
      defaults: {
        to: MAIL_ID,
        from: MAIL_ID
      },

    })
  ],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule { }
