import { Category } from '@/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ApiCategoryController } from './api.category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController, ApiCategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
