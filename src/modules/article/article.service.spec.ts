import { ArticleModule } from '@/modules/article/article.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { ArticleService } from './article.service';
import configuration from '@/modules/config/configuration';

describe('ArticleService', () => {
  let service: ArticleService;
  beforeEach(async () => {
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
        ArticleModule
      ]
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();
    service = moduleRef.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
