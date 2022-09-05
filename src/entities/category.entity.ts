import { Article } from './article.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNotEmpty } from 'class-validator';
import { Validate } from '@/decorators/validate.decorator';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ nullable: true })
  state: string;

  @IsNotEmpty()
  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ nullable: true })
  remark: string;

  @OneToMany(() => Article, article => article.category)
  articles: Article;

  @Validate()
  @BeforeInsert()
  init() {
    Object.assign(this, { state: 'pending' });
  }
}
