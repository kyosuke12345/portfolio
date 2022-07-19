import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { addYears, differenceInYears } from 'date-fns';
import { lastValueFrom, map } from 'rxjs';
import { ErrorLoggerService } from 'libs/lib/src/custom-logger/error-logger.service';
import { CryptocurrencyDayData } from 'libs/lib/src/database/entities/cryptocurrencyDayData.entity';
import { Repository } from 'typeorm';
import { CryptocurrencyMaster } from '@lib/lib/database/entities/cryptocurrencyMaster.entity';

type LiquidResponse = {
  average_price: string;
};

@Injectable()
export class CronService {
  constructor(
    private httpService: HttpService,
    private errorLogger: ErrorLoggerService,
    @InjectRepository(CryptocurrencyDayData)
    private dayDataRepository: Repository<CryptocurrencyDayData>,
    @InjectRepository(CryptocurrencyMaster)
    private readonly cryptocurrencyMasterRepository: Repository<CryptocurrencyMaster>,
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
      const cryptocurrencyList = await this.cryptocurrencyMasterRepository.find(
        {
          order: {
            id: 'ASC',
          },
        },
      );
      for (const cryptocurrency of cryptocurrencyList) {
        const type = cryptocurrency.type;
        let response: LiquidResponse | null = null;
        try {
          response = await lastValueFrom(
            this.httpService
              .get<LiquidResponse>(`https://api.liquid.com/products/${type}`)
              .pipe(map((res) => res.data)),
          );
        } catch (e) {
          this.sendEmail('apiの取得に失敗しました。', `type: ${type}`);
          continue;
        }
        if (response === null) {
          continue;
        }
        let dayData = await this.dayDataRepository.findOne({
          where: {
            cryptocurrencyType: type,
            day: nowDate,
          },
        });
        const nowPrice = Number(response.average_price);
        if (!dayData) {
          // 新規登録
          const addData = CryptocurrencyDayData.generate({
            price: nowPrice,
            type: type,
            day: nowDate,
          });
          dayData = await this.dayDataRepository.save(addData);
        } else {
          // 更新
          CryptocurrencyDayData.update(dayData, { price: nowPrice });
          dayData = await this.dayDataRepository.save(dayData);
        }

        // 閾値のチェック
        const cryptocurrencyName = cryptocurrency.name;
        if (
          cryptocurrency.minThreshold !== null &&
          cryptocurrency.minThreshold >= nowPrice
        ) {
          if (!this.isSendMail) {
            this.sendEmail(
              `${cryptocurrencyName}の価格が${cryptocurrency.minThreshold}を下回りました。`,
              `現在の平均価格：${nowPrice}`,
            );
            this.isSendMail = true;
          }
        }

        if (
          cryptocurrency.maxThreshold !== null &&
          cryptocurrency.maxThreshold <= nowPrice
        ) {
          if (!this.isSendMail) {
            this.sendEmail(
              `${cryptocurrencyName}の価格が${cryptocurrency.maxThreshold}を超えました。`,
              `現在の平均価格：${nowPrice}`,
            );
            this.isSendMail = true;
          }
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
