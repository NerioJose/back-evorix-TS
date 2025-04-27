import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';

@Controller('register')
export class RegisterController {
  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto): unknown {
    // Aquí ya tienes todos los datos validados automáticamente
    console.log(createUserDto);
    return { message: 'Usuario creado exitosamente', data: createUserDto };
  }
}
