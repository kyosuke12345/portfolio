import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export const MAX_LENGTH = {
  NAME: 50
} as const;

@Entity('hobby')
export class Hobby {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: MAX_LENGTH.NAME })
  name: string;

  @Column({ name: 'user_id', type: 'bigint' })
  userId: number;

  @ManyToOne(() => User, user => user.hobbies)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @AfterLoad()
  afterLoad() {
    this.id = Number(this.id);
    this.userId = Number(this.userId);
  }
}