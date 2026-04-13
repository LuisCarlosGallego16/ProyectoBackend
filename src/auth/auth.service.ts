import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsuariosService } from '../users/users.service';
import { TelegramService } from './telegram.service';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
    private telegramService: TelegramService,
  ) {}

  // 🔥 almacenamiento temporal códigos 2FA
  private codigos2FA = new Map<string, string>();

  // =========================
  // LOGIN (FASE 1)
  // =========================
  async login(email: string, password: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await bcrypt.compare(
      password,
      usuario.password,
    );

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 🔥 generar código
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    this.codigos2FA.set(email, codigo);

    // 🔥 enviar a Telegram
    await this.telegramService.enviarMensaje(
      `Tu código de acceso es: ${codigo}`,
    );

    return {
      message: 'Código enviado a Telegram',
    };
  }

  // =========================
  // VERIFICAR 2FA
  // =========================
  async verificarCodigo(email: string, codigo: string) {
    const codigoGuardado = this.codigos2FA.get(email);

    if (!codigoGuardado || codigoGuardado !== codigo) {
      throw new UnauthorizedException('Código inválido');
    }

    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
    };

    this.codigos2FA.delete(email);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}