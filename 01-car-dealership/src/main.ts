import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // Retorna un error si manda mas propiedades que los que necesita
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
