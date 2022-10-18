import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  readonly configService: ConfigService;

  getItem() {
    console.log('======start======');
  }
}
