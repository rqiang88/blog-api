import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class RedisModule {
  static register(options): DynamicModule {
    const providers = [
      {
        provide: 'RedisModuleOptions',
        useFactory: options.useFactory,
        inject: options.inject
      },
      {
        provide: RedisService,
        useFactory: (configService: ConfigService) => {
          console.log(configService);
          return new RedisService();
        },
        inject: ['RedisModuleOptions']
      }
    ];
    return {
      global: true,
      module: RedisModule,
      providers,
      exports: providers
    };
  }
}
