import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import { GlobleException } from '@/filters/globle.filter';
import { ResponseInterceptor } from '@/injectables/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new GlobleException());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(8086);
}
bootstrap();
