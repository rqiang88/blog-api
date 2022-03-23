import { Validate } from '@/decorators/validate.decorator';
import { IsNotEmpty } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Unique
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';

@Unique(['categoryId', 'title'])
@Entity('articles')
export class Article extends BaseEntity {
  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ nullable: true })
  state: string;

  @IsNotEmpty()
  @Column({ nullable: true })
  title: string;

  @IsNotEmpty()
  @Column({ nullable: true, type: 'text' })
  content: string;

  @ManyToOne(() => Category, category => category.articles)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Validate()
  @BeforeInsert()
  init() {
    Object.assign(this, { state: 'pending' });
  }
}
