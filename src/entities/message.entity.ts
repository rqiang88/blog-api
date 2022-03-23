import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  account: string;

  @Column({ nullable: true, type: 'text' })
  content: string;
}
