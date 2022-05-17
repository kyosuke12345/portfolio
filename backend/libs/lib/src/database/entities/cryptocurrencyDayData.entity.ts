import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CryptocurrencyMaster } from './cryptocurrencyMaster.entity';
import { MAX_DB_LENGTH } from './dbType';

type GenerateType = {
  price: number;
  day: Date;
  type: string;
};

type UpdateType = Pick<GenerateType, 'price'>;

/**
 * 仮想通貨 日にちのデータ
 */
@Entity('cryptocurrency_day_data')
export class CryptocurrencyDayData {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'cryptocurrency_type',
    type: 'varchar',
    length: MAX_DB_LENGTH.CRYPTOCURRENCY_TYPE,
  })
  cryptocurrencyType: string;

  @Column({ name: 'max_price', type: 'float' })
  maxPrice: number;

  @Column({ name: 'min_price', type: 'float' })
  minPrice: number;

  @Column({ name: 'hajime_price', type: 'float' })
  hajimePrice: number;

  @Column({ name: 'owari_price', type: 'float', nullable: true })
  owariPrice: number;

  @Column({ name: 'day', type: 'date' })
  day: Date;

  @ManyToOne(() => CryptocurrencyMaster, (master) => master.dayData)
  @JoinColumn({ name: 'cryptocurrency_type', referencedColumnName: 'type' })
  master: CryptocurrencyMaster;

  @AfterLoad()
  afterLoad() {
    this.id = Number(this.id);
    this.day = new Date(this.day);
  } 

  static generate(param: GenerateType): CryptocurrencyDayData {
    const res = new CryptocurrencyDayData();
    res.hajimePrice = param.price;
    res.owariPrice = param.price;
    res.minPrice = param.price;
    res.maxPrice = param.price;
    res.day = param.day;
    res.cryptocurrencyType = param.type;
    return res;
  }

  static update(nowDate: CryptocurrencyDayData, { price }: UpdateType): void {
    nowDate.owariPrice = price;
    if (nowDate.minPrice > price) {
      nowDate.minPrice = price;
    }
    if (nowDate.maxPrice < price) {
      nowDate.maxPrice = price;
    }
  }
}
