import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ApiArticleController } from './api.article.controller';
import { Article } from '@/entities/article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => cb(null, file.originalname)
      })
    })
  ],
  controllers: [ArticleController, ApiArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
