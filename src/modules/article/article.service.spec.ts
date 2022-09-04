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

describe('ArticleService', () => {
  let service: ArticleService;
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
    const category = await categoryService.create({
      name: 'test',
      state: 'active'
    });
    await service.create({
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

  afterAll(async () => {
    await getConnection().query('delete from articles');
    await getConnection().query('delete from categories');
  });
});
