// src/modules/auth/auth-module/dto/login-user.dto.ts
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, {
    message: 'Email no tiene un formato válido.',
  })
  email!: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'La contraseña debe tener al menos 6 caracteres, una letra y un número.',
  })
  password!: string;
}
