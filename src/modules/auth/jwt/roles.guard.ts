// src/modules/auth/auth-module/jwt/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard extends JwtGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return super.canActivate(context); // Si no se requiere rol, solo verificamos el JWT
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // El usuario validado por el JWT guard
    return roles.includes(user.rol); // Verificamos si el rol del usuario está permitido
  }
}
