import { AppDataSource } from './data-source';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';
import cluster from 'cluster';
import os from 'os';
import 'dotenv/config';
import { configDotenv } from 'dotenv';
configDotenv();

async function bootstrap() {
  await AppDataSource.initialize();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 1048576,
      logger: true,
    }),
  );

  await app.register(fastifyHelmet, { contentSecurityPolicy: false });
  await app.register(fastifyCompress, { global: true });
  await app.register(fastifyCors, {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(
    process.env.PORT ? Number(process.env.PORT) : 3000,
    '0.0.0.0',
  );
}

const isDevelopment = process.env.NODE_ENV !== 'production';

if (!isDevelopment && cluster.isPrimary) {
  const cpuCount = os.cpus().length;
  console.log(`🔥 Iniciando Cluster con ${cpuCount} procesos...`);

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`⚠️ Worker ${worker.process.pid} murió. Reiniciando...`);
    cluster.fork();
  });
} else {
  bootstrap();
}
