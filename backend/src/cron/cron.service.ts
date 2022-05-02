import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lastValueFrom, map } from 'rxjs';
import { ErrorLoggerService } from 'src/custom-logger/error-logger.service';
import { isProduct } from '../config/enviroment'

type LiquidResponse = {
  average_price: string;
}

const OVER_PRICE = 3000;

@Injectable()
export class CronService {
  constructor(private httpService: HttpService, private errorLogger: ErrorLoggerService, private mailService: MailerService) { }
  isSendMail = false;
  isSendErrorMail = false;

  /**
   * メールの送信
   * @param subject 
   * @param text 
   */
  private sendEmail(subject: string, text: string): void {
    if (isProduct()) {
      this.mailService.sendMail({
        subject: subject,
        text: text
      })
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async getLiquidSOL() {
    try {
      const response = await lastValueFrom(this.httpService.get<LiquidResponse>('https://api.liquid.com/products/855').pipe(map((res) => res.data)));
      if (OVER_PRICE <= Number(response.average_price)) {
        if (!this.isSendMail) {
          this.sendEmail(`Liquidの通知SOLが${OVER_PRICE}を超えました。`, `現在の平均価格：${response.average_price}`);
          this.isSendMail = true;
        }
      }
    } catch {
      if (!this.isSendErrorMail) {
        this.sendEmail(`Liquidのapiの取得に失敗しました。`, "");
        this.isSendErrorMail = true;
      }
    }
  }

  /**
   * サイトが落ちないように１０分ごとにアクセスする。
   */
  @Cron(CronExpression.EVERY_10_MINUTES)
  async accessMySite() {
    try {
      this.httpService.get('https://akasatana-portfolio.herokuapp.com/').subscribe();
    } catch {
      this.sendEmail(`Herokuの自身のサイトへのアクセスに失敗しました。`, "");
    }
  }
}
