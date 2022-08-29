import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisServer {
  readonly configService: ConfigService;

  getItem() {
    console.log('======start======');
  }
}
