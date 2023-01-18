import { NestFactory } from '@nestjs/core';

import './loadEnv';
import { AppModule } from './App.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
