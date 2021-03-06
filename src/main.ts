import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import { GlobalException } from '@/filters/global.filter';
import { ResponseInterceptor } from '@/injectables/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .addTag('V1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1', app, document);

  app.enableCors();
  app.useGlobalFilters(new GlobalException());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(8086);
}
bootstrap();
