import { Validate } from '@/decorators/validate.decorator';
import { digest } from '@/utils/digest.util';
import { Exclude } from 'class-transformer';
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
  @Exclude()
  password: string;

  @BeforeInsert()
  @Validate()
  init() {
    Object.assign(this, { password: digest(this.password), state: 'normal' });
  }
}
