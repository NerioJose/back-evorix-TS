import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';
import { RegisterService } from '../../services/register/register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      // Llama al servicio para registrar al usuario
      const response = await this.registerService.createUser(createUserDto);
      return response;
    } catch (error) {
      // Asegura el tipo del error
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        'statusCode' in (error as any).response
      ) {
        const errorMessage =
          (error as any).response.message || 'Error desconocido';
        throw new BadRequestException(errorMessage);
      }

      // Manejo de otros errores
      throw new BadRequestException(
        'Hubo un problema al registrar al usuario.',
      );
    }
  }
}
