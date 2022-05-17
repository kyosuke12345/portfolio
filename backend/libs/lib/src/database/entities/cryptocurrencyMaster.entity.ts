import { CreateCryptocurrencyDTO, UpdateCryptocurrencyDTO } from 'src/cryptocurrency-master/class/cryptocurrency-master.dto';
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

  @Column({
    name: 'min_threshold',
    type: 'integer',
    nullable: true,
  })
  minThreshold: number;

  @Column({
    name: 'max_threshold',
    type: 'integer',
    nullable: true,
  })
  maxThreshold: number;

  @OneToMany(
    () => CryptocurrencyDayData,
    (minutesData) => minutesData.cryptocurrencyType,
  )
  dayData: CryptocurrencyDayData;

  @AfterLoad()
  afterLoad() {
    this.id = Number(this.id);
  }

  static generate(dto: CreateCryptocurrencyDTO): CryptocurrencyMaster {
    let res = new CryptocurrencyMaster();
    res.type = dto.type;
    res.name = dto.name;
    res.minThreshold = dto.minThreshold;
    res.maxThreshold = dto.maxThreshold;
    return res;
  }

  static update(data: CryptocurrencyMaster, dto: UpdateCryptocurrencyDTO): void {
    data.type = dto.type;
    data.name = dto.name;
    data.minThreshold = dto.minThreshold;
    data.maxThreshold = dto.maxThreshold;
  }
}
