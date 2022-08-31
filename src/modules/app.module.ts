import { RedisModule } from './redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '@/modules/article/article.module';
import { CategoryModule } from '@/modules/category/category.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('db');
      },
      inject: [ConfigService]
    }),
    RedisModule.register({
      useFactory: async (configService: ConfigService) => {
        return configService;
      },
      inject: [ConfigService]
    }),
    CategoryModule,
    ArticleModule,
    UserModule,
    AuthModule,
    MessageModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
