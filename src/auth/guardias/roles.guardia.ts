import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuardia implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //Obtiene los roles definidos con @Roles()
    const rolesRequeridos = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    //Si no hay roles definidos, deja pasar a todos
    if (!rolesRequeridos || rolesRequeridos.length === 0) {
      return true;
    }
    //Obtiene el request (HTTP)
    const request = context.switchToHttp().getRequest();
    //Obtiene el usuario que viene del JwtGuardia
    const usuario = request.user;
    //Si no hay usuario o no tiene rol → bloquea
    if (!usuario || !usuario.role) {
      return false;
    }
    //Verifica si el rol del usuario está permitido
    return rolesRequeridos.includes(usuario.role);
  }
}