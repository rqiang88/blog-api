import { Category } from '@/entities/category.entity';
import { CategoryModule } from '@/modules/category/category.module';
import { QueryArticleDto } from './dto/query-article.dto';
import { ArticleModule } from '@/modules/article/article.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { ArticleService } from './article.service';
import configuration from '@/modules/config/configuration';
import { getConnection } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { Article } from '@/entities/article.entity';

describe('ArticleService', () => {
  let service: ArticleService;
  let category: Category;
  let article: Article;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [`.env.${process.env.NODE_ENV}`],
          load: [configuration]
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => configService.get('db'),
          inject: [ConfigService]
        }),
        ArticleModule,
        CategoryModule
      ]
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();
    service = moduleRef.get<ArticleService>(ArticleService);

    // generate default data
    const categoryService = moduleRef.get<CategoryService>(CategoryService);
    category = await categoryService.create({
      name: 'test-1',
      state: 'active'
    });
    article = await service.create({
      categoryId: category.id,
      title: 'article',
      content: 'article'
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    const query = { limit: 20, page: 1 };
    const result = await service.findAll(query as QueryArticleDto);
    expect(result.data.length).toBe(1);
  });

  it('findOne', async () => {
    expect(await service.findOne(article.id)).toBeInstanceOf(Article);
  });

  it('create', async () => {
    const data = { categoryId: category.id, title: 'hello', content: 'hello' };
    expect(await service.create(data)).toBeInstanceOf(Article);
  });

  it('update', async () => {
    const data = { content: 'update' };
    expect(await service.update(article.id, data)).toBeInstanceOf(Article);
  });

  it('remove', async () => {
    const data = await service.remove(article.id);
    expect(data.message).toBe('success');
  });

  afterAll(async () => {
    await getConnection().query('delete from articles');
    await getConnection().query('delete from categories');
  });
});
