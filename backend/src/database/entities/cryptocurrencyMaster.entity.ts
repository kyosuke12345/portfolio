import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CryptocurrencyDayData } from './cryptocurrencyDayData.entity';
import { MAX_DB_LENGTH } from './dbType';

/**
 * 仮想通貨マスター
 */
@Entity('cryptocurrency_master')
export class CryptocurrencyMaster {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'type',
    type: 'varchar',
    length: MAX_DB_LENGTH.CRYPTOCURRENCY_TYPE,
    unique: true,
  })
  type: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: MAX_DB_LENGTH.CURRENCY_NAME,
  })
  name: string;

  @OneToMany(
    () => CryptocurrencyDayData,
    (minutesData) => minutesData.cryptocurrencyType,
  )
  dayData: CryptocurrencyDayData;

  @AfterLoad()
  afterLoad() {
    this.id = Number(this.id);
  }
}
