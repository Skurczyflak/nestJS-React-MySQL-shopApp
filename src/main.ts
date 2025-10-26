import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './shared/interceptors/logger.interceptor';
import * as express from 'express';
import { join } from 'path';
import { env } from 'process';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.setGlobalPrefix('api');
  app.enableCors();

  app.use('/public', express.static(join(__dirname, '../../', 'public')));

  const clientBuildPath = join(__dirname, '../../', 'client', 'build');
  app.use(express.static(clientBuildPath));

  app.use((req: Request, res: Response, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(join(clientBuildPath, 'index.html'));
    } else {
      next();
    }
  });

  await app.enableShutdownHooks();
  await app.listen(env.PORT || 3000);
}
bootstrap();
