import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '@/modules/article/article.module';
import { CategoryModule } from '@/modules/category/category.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { MessageModule } from '@/modules/message/message.module';
import configuration from '@/modules/config/configuration';
import { RedisModule } from '@/modules/redis/redis.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('db'),
      inject: [ConfigService]
    }),
    RedisModule.register({
      useFactory: async (configService: ConfigService) => configService,
      inject: [ConfigService]
    }),
    CategoryModule,
    ArticleModule,
    UserModule,
    AuthModule,
    MessageModule
  ],
  providers: []
})
export class AppModule {}
