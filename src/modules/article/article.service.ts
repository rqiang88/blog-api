import { IObject } from '@/interfaces/response.interface';
import { IQueryResult } from '@/interfaces/paginate.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { CreateArticleDto as C } from './dto/create-article.dto';
import { UpdateArticleDto as U } from './dto/update-article.dto';
import { QueryArticleDto as Q } from './dto/query-article.dto';
import { Article } from '@/entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>
  ) {}

  @Transaction()
  async create(createArticleDto: C): Promise<Article> {
    const entity = await this.repository.create(createArticleDto);
    return await this.repository.save(entity);
  }

  async findAll(queryArticleDto: Q): Promise<Partial<IQueryResult<Article>>> {
    const { page, skip, take, limit, title, categoryId } = queryArticleDto;
    let repository = this.repository.createQueryBuilder('article');

    if (!!categoryId) {
      repository = repository.where('category_id = :categoryId', {
        categoryId
      });
    }

    if (!!title) {
      repository = repository.where('title like :title', { title });
    }

    const total = await repository.getCount();
    const data = await repository.take(take).skip(skip).getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async findOne(id: number): Promise<Article> {
    return await this.repository.findOneOrFail(id);
  }

  async update(id: number, updateArticleDto: U): Promise<Article> {
    await this.repository.update(id, updateArticleDto);
    return await this.repository.findOneOrFail(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.delete(id);
    return { message: 'success' };
  }
}
