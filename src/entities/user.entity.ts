import { digest } from '@/utils/digest.util';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: true })
  account: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  password: string;

  @BeforeInsert()
  init() {
    Object.assign(this, { password: digest(this.password), state: 'normal' });
  }
}
