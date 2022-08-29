import { RedisModule } from './redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '@/modules/article/article.module';
import { CategoryModule } from '@/modules/category/category.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { ConfigModule as SelfConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SelfConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.dbConfig;
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
