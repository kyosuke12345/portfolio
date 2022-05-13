import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { addYears, differenceInYears } from 'date-fns';
import { lastValueFrom, map } from 'rxjs';
import { ErrorLoggerService } from 'src/custom-logger/error-logger.service';
import { CryptocurrencyDayData } from 'src/database/entities/cryptocurrencyDayData.entity';
import { CRYPTOCURRENCY_TYPE } from 'src/database/entities/dbType';
import { Repository } from 'typeorm';

type LiquidResponse = {
  average_price: string;
};

const OVER_PRICE = 300000;

@Injectable()
export class CronService {
  constructor(
    private httpService: HttpService,
    private errorLogger: ErrorLoggerService,
    @InjectRepository(CryptocurrencyDayData)
    private dayDataRepository: Repository<CryptocurrencyDayData>,
  ) {}
  isSendMail = false;
  isSendErrorMail = false;

  /**
   * メールの送信
   * @param subject
   * @param text
   */
  private sendEmail(subject: string, text: string): void {
    this.errorLogger.log(`paper trail send mail: ${subject} ${text}`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async deleteData() {
    const nowDate = new Date();
    const twoYearsBeforeDate = addYears(nowDate, -2);
    // 10,000レコードしか登録できないので2年分のデータのみ登録
    await this.dayDataRepository
      .createQueryBuilder()
      .delete()
      .where('day <= :day', { day: twoYearsBeforeDate })
      .execute();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async getLiquidSOL() {
    try {
      const nowDate = new Date();
      for (const key in CRYPTOCURRENCY_TYPE) {
        const response = await lastValueFrom(
          this.httpService
            .get<LiquidResponse>(
              `https://api.liquid.com/products/${CRYPTOCURRENCY_TYPE[key]}`,
            )
            .pipe(map((res) => res.data)),
        );
        const dayData = await this.dayDataRepository.findOne({
          where: {
            cryptocurrencyType: CRYPTOCURRENCY_TYPE[key],
            day: nowDate,
          },
        });
        const nowPrice = Number(response.average_price);
        if (!dayData) {
          // 新規登録
          const addData = CryptocurrencyDayData.generate({
            price: nowPrice,
            type: CRYPTOCURRENCY_TYPE[key],
            day: nowDate,
          });
          // awaitしなくてOK
          this.dayDataRepository.save(addData);
        } else {
          // 更新
          CryptocurrencyDayData.update(dayData, { price: nowPrice });
          // awaitしなくてOK
          this.dayDataRepository.save(dayData);
        }
      }

      // TODO 後で修正
      const response = await lastValueFrom(
        this.httpService
          .get<LiquidResponse>('https://api.liquid.com/products/855')
          .pipe(map((res) => res.data)),
      );

      if (OVER_PRICE <= Number(response.average_price)) {
        if (!this.isSendMail) {
          this.sendEmail(
            `Liquidの通知SOLが${OVER_PRICE}を超えました。`,
            `現在の平均価格：${response.average_price}`,
          );
          this.isSendMail = true;
        }
      }
    } catch {
      if (!this.isSendErrorMail) {
        this.sendEmail(`Liquidのapiの取得に失敗しました。`, '');
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
      this.httpService
        .get('https://akasatana-portfolio.herokuapp.com/')
        .subscribe();
    } catch {
      this.sendEmail(`Herokuの自身のサイトへのアクセスに失敗しました。`, '');
    }
  }
}
