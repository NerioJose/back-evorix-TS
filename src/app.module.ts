import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth-module/auth-module.module';
import { configDotenv } from 'dotenv';
//import { Usuario } from './modules/auth/entities/user.entity'; // Asegúrate que esta ruta sea correcta
//import { LoginService } from './modules/auth/services/login/login.service';

configDotenv();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
      synchronize: true, // ⚠️ Desactívalo en producción
      autoLoadEntities: true, // Esto carga automáticamente las entidades registradas en otros módulos
    }),
    AuthModule,
  ],
})
export class AppModule {}
