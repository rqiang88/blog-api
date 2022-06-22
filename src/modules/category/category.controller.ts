import { IObject } from '@/interfaces/response.interface';
import { IQueryResult } from '@/interfaces/paginate.interface';
import { RoleGuard } from '@/injectables/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { QueryCategoryDto as Q } from './dto/query-category.dto';
import { CreateCategoryDto as C } from './dto/create-category.dto';
import { UpdateCategoryDto as U } from './dto/update-category.dto';
import { Paginate } from '@/decorators/paginate.decorator';
import { Category } from '@/entities/category.entity';

// @UseGuards(RoleGuard)
// @UseGuards(AuthGuard('jwt'))
@Controller('admin/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: C): Promise<Category> {
    console.log(createCategoryDto);
    return await this.categoryService.create(createCategoryDto);
  }

  @Post('list')
  async findAll(
    @Paginate() queryCategoryDto: Q
  ): Promise<Partial<IQueryResult<Category>>> {
    return await this.categoryService.findAll(queryCategoryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: U) {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IObject> {
    return await this.categoryService.remove(+id);
  }
}
