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
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 1048576, // Límite razonable para el tamaño del cuerpo
      logger: true,
    }),
  );

  // Middleware: Seguridad y optimización
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false, // Ajustar según sea necesario
  });
  await app.register(fastifyCompress, {
    encodings: ['gzip', 'deflate'], // Configura algoritmos de compresión
  });
  await app.register(fastifyCors, {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Pipes para validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = Number(process.env.PORT) || 3000;

  // Manejo de errores al iniciar el servidor
  try {
    await app.listen(port);
    console.log(`🚀 Servidor escuchando en el puerto ${port}`);
  } catch (error) {
    if (error instanceof Error) {
      // Si el error es de tipo Error
      console.error(`⚠️ Error al iniciar el servidor: ${error.message}`);
    } else {
      // Para errores que no sean del tipo Error
      console.error(`⚠️ Error desconocido al iniciar el servidor`, error);
    }
    process.exit(1); // Finaliza la ejecución en caso de error crítico
  }
}

const isDevelopment = process.env.NODE_ENV !== 'production';

if (!isDevelopment && cluster.isPrimary) {
  const cpuCount = Math.max(2, os.cpus().length); // Configurar número de procesos mínimo
  console.log(`🔥 Iniciando Cluster con ${cpuCount} procesos...`);

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`⚠️ Worker ${worker.process.pid} murió. Reiniciando...`);
    cluster.fork(); // Reinicia el worker
  });
} else {
  bootstrap();
}
