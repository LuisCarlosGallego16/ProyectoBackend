import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Antes de entrar a este endpoint, valida el JWT usando la estrategia 'jwt'
@Injectable()
export class JwtGuardia extends AuthGuard('jwt') {}