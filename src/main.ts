import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: true})
  app.use(cookieParser());

  const port = process.env.APP_PORT || 5000;
  const config = new DocumentBuilder()
    .setTitle('iom-spa-api')
    .setDescription('Документация по API')
    .setVersion('1.0.0')
    .build()
  const document =SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(port, () => console.log(`Сервер запущен на порте: ${port}`));
}
bootstrap();
