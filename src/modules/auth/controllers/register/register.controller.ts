import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';

@Controller('register')
export class RegisterController {
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): {
    message: string;
    data: CreateUserDto;
  } {
    console.log(createUserDto);
    return { message: 'Usuario creado exitosamente', data: createUserDto };
  }
}
