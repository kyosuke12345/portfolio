import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CryptocurrencyMaster } from './cryptocurrencyMaster.entity';
import { MAX_DB_LENGTH } from './dbType';

/**
 * 仮想通貨閾値
 */
@Entity('cryptocurrency_threshold')
export class CryptocurrencyThreshold {
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

  @OneToOne(() => CryptocurrencyMaster)
  @JoinColumn({ name: 'cryptocurrency_type', referencedColumnName: 'type' })
  master: CryptocurrencyMaster;

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

  @UpdateDateColumn({
    name: 'update_dt'
  })
  updateDT: Date;

  @AfterLoad()
  afterLoad() {
    this.id = Number(this.id);
  }
}
