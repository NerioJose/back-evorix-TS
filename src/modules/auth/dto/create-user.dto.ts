import { IsString, MinLength, Matches, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Nombre solo puede contener letras y espacios.',
  })
  @MinLength(2)
  @MaxLength(40)
  nombre!: string;

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
