import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // SSL
  const httpsOptions = {
    key: readFileSync('./cert/key.pem'),
    cert: readFileSync('./cert/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions, cors: true });
  app.use(bodyParser.json({ limit: '15mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
