import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import configuration from '@/modules/config/configuration';
import { getConnection } from 'typeorm';
import { QueryCategoryDto } from './dto/query-category.dto';
import { Category } from '@/entities/category.entity';
import { CategoryModule } from '@/modules/category/category.module';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let category: Category;

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
        CategoryModule
      ]
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    service = moduleRef.get<CategoryService>(CategoryService);

    // generate default data
    category = await service.create({
      name: 'category-1',
      state: 'active'
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    const query = { limit: 20, page: 1 };
    const result = await service.findAll(query as QueryCategoryDto);
    expect.objectContaining(result);
  });

  it('findOne', async () => {
    expect(await service.findOne(category.id)).toBeInstanceOf(Category);
  });

  it('create', async () => {
    const data = await service.create({ name: 'category-2' });
    expect(data).toBeInstanceOf(Category);
  });

  it('update', async () => {
    const data = { name: 'category-3' };
    expect(await service.update(category.id, data)).toBeInstanceOf(Category);
  });

  it('remove', async () => {
    const data = await service.remove(category.id);
    expect(data.message).toBe('success');
  });

  afterAll(async () => {
    await getConnection().query('delete from categories');
  });
});
