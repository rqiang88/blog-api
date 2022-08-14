import { QueryArticleDto as Q } from './dto/query-article.dto';
import { Paginate } from '@/decorators/paginate.decorator';
import { Article } from '@/entities/article.entity';
import { IQueryResult } from '@/interfaces/paginate.interface';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
@Controller('api/articles')
export class ApiArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('list')
  async findAll(
    @Paginate() queryArticleDto: Q
  ): Promise<Partial<IQueryResult<Article>>> {
    return await this.articleService.findAll(queryArticleDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return await this.articleService.findOne(+id);
  }
}
