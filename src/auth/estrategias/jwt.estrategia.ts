import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtEstrategia extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
        // Indica que el JWT se obtiene del header Authorization: Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Clave secreta usada para firmar y validar el token
      // Si no existe en .env, usa 'secreto' 
      secretOrKey: configService.get<string>('JWT_SECRET') || 'secreto',
    });
  }
  // Este método se ejecuta automáticamente cuando el token es válido
  async validate(payload: any) {
    // Retornamos los datos que estarán disponibles en request.user
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}