// src/modules/auth/auth-module/controllers/login/login.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { LoginService } from '../../services/login/login.service';
import { LoginUserDto } from '../../../auth/dto/login-user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.loginService.login(loginUserDto);
    if (!result) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return result;
  }
}
