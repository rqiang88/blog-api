import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '@/modules/article/article.module';
import { CategoryModule } from '@/modules/category/category.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    EventEmitterModule.forRoot(),
    ArticleModule,
    CategoryModule,
    UserModule,
    AuthModule,
    MessageModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
