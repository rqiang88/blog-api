import { Category } from '@/entities/category.entity';
import { Paginate } from '@/decorators/paginate.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { QueryCategoryDto as Q } from './dto/query-category.dto';
import { IQueryResult } from '@/interfaces/paginate.interface';

@Controller('api/categories')
export class ApiCategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  async findAll(
    @Paginate() queryCategoryDto: Q
  ): Promise<Partial<IQueryResult<Category>>> {
    return await this.service.findAll(queryCategoryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.service.findOne(+id);
  }
}
