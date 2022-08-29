import { RedisServer } from './redis.service';
import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
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
        provide: RedisServer,
        useFactory: () => {
          return new RedisServer();
        },
        inject: ['RedisModuleOptions']
      }
    ];
    return {
      module: RedisModule,
      providers,
      exports: providers
    };
  }
}
