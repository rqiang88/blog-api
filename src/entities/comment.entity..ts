import { Article } from '@/entities/article.entity';
import { User } from './user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('comments')
export class Comment extends BaseEntity {
  @Column({ nullable: true, name: 'user_id' })
  userId: number;

  @Column({ nullable: true, name: 'article_id' })
  articleId: number;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => User)
  article: Article;
}
