import { ConfigService as SysConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: SysConfigService) {}

  get dbConfig(): TypeOrmModuleOptions {
    const db = {
      type: this.configService.get('DB_TYPE') || 'mysql',
      host: this.configService.get('DB_HOST') || '127.0.0.1',
      port: this.configService.get('DB_PORT') || 3306,
      username: this.configService.get('DB_USERNAME') || 'root',
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      synchronize: true,
      logging: false,
      entities: ['dist/entities/**/*.js'],
      migrations: ['dist/migrations/**/*.js'],
      subscribers: ['src/subscribers/**/*.ts'],
      cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers'
      }
    };
    return db;
  }
}
