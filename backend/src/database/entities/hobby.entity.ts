import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToOne(() => User, user => user.hobbies)
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  user: User;
}