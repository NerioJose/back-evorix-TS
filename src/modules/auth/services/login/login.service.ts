import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../dto/login-user.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    // Verificar si el usuario existe en la base de datos
    const user = await this.usuarioRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Lanzar excepción si las credenciales no son válidas
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    // Payload seguro para el token JWT
    const payload = { sub: user.id, email: user.email, rol: user.rol };
    const token = this.jwtService.sign(payload, {
      expiresIn: '1h', // Duración del token (configurable)
    });

    // Retorno enriquecido
    return {
      status: 'success',
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    };
  }
}
