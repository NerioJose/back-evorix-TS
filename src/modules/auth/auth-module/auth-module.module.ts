import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/user.entity';
import { RegisterController } from '../controllers/register/register.controller';
import { RegisterService } from '../services/register/register.service';
import { LoginController } from '../controllers/login/login.controller';
import { LoginService } from '../services/login/login.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secreto',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [RegisterController, LoginController],
  providers: [RegisterService, LoginService, JwtStrategy],
})
export class AuthModule {}
