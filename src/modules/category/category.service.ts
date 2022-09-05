import { IQueryResult } from '@/interfaces/paginate.interface';
import { Category } from '@/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto as C } from './dto/create-category.dto';
import { UpdateCategoryDto as U } from './dto/update-category.dto';
import { QueryCategoryDto as Q } from './dto/query-category.dto';
import { IObject } from '@/interfaces/response.interface';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {}

  async create(createCategoryDto: C): Promise<Category> {
    const entity = await this.repository.create(createCategoryDto);
    return await this.repository.save(entity);
  }

  async findAll(queryCategoryDto: Q): Promise<Partial<IQueryResult<Category>>> {
    const { page, skip, take, limit, name } = queryCategoryDto;
    const repository = this.repository.createQueryBuilder('category');
    if (!!name) {
      repository.where('name like :name', {
        name: `%${name}%`
      });
    }
    const total = await repository.getCount();
    const data = await repository.take(take).skip(skip).getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async findOne(id: number): Promise<Category> {
    return await this.repository.findOneOrFail(id);
  }

  async update(id: number, updateCategoryDto: U): Promise<Category> {
    await this.repository.update(id, updateCategoryDto);
    return await this.repository.findOneOrFail(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.delete(id);
    return { message: 'success' };
  }
}
