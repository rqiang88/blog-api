import { RoleGuard } from '@/injectables/guards/role.guard';
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
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { CreateArticleDto as C } from './dto/create-article.dto';
import { UpdateArticleDto as U } from './dto/update-article.dto';
import { QueryArticleDto as Q } from './dto/query-article.dto';
import { IQueryResult } from '@/interfaces/paginate.interface';
import { IObject } from '@/interfaces/response.interface';
import { Paginate } from '@/decorators/paginate.decorator';
import { Article } from '@/entities/article.entity';
import { ApiBody } from '@nestjs/swagger';

@UseGuards(RoleGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('admin/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: C): Promise<Article> {
    return await this.articleService.create(createArticleDto);
  }

  @ApiBody({ type: [Q] })
  @Post('list')
  findAll(
    @Paginate() queryArticleDto: Q
  ): Promise<Partial<IQueryResult<Article>>> {
    return this.articleService.findAll(queryArticleDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return await this.articleService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArticleDto: U) {
    return await this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IObject> {
    return await this.articleService.remove(+id);
  }
}
