import {
  IsString,
  MinLength,
  Matches,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Nombre solo puede contener letras y espacios.',
  })
  @MinLength(2, { message: 'Nombre debe tener al menos 2 caracteres.' })
  @MaxLength(40, { message: 'Nombre no puede superar los 40 caracteres.' })
  nombre!: string;

  @IsEmail({}, { message: 'Email no tiene un formato válido.' })
  @MaxLength(255, { message: 'Email no puede superar los 255 caracteres.' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Contraseña debe tener al menos 6 caracteres.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'La contraseña debe tener al menos 6 caracteres, una letra y un número.',
  })
  password!: string;
}
