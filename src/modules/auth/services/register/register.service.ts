import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../../auth/entities/user.entity';
import { CreateUserDto } from '../../../auth/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { nombre, email, password } = createUserDto;

    // Verificar si el email ya existe antes de continuar
    const existeEmail = await this.usuarioRepository.findOne({
      where: { email },
    });
    if (existeEmail) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña con un factor de costo adecuado (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear instancia del usuario con los datos proporcionados
    const nuevoUsuario = this.usuarioRepository.create({
      nombre,
      email,
      password: hashedPassword,
    });

    try {
      // Guardar el usuario en la base de datos
      const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);

      // Respuesta exitosa y estructurada
      return {
        status: 'success',
        message: 'Usuario registrado exitosamente',
        data: {
          id: usuarioGuardado.id,
          nombre: usuarioGuardado.nombre,
          email: usuarioGuardado.email,
        },
      };
    } catch (error: any) {
      // Manejo de errores específicos y generales
      if (error.code === '23505') {
        throw new ConflictException('El email ya está registrado');
      }

      console.error('Error al registrar usuario:', error.message);
      throw new InternalServerErrorException('Error al registrar usuario');
    }
  }
}
