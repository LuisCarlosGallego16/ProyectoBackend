import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsuariosService } from '../users/users.service';
import { TelegramService } from './telegram.service';
import { RegistroDto } from './dto/registro.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
    private telegramService: TelegramService,
  ) {}

  //almacenamiento temporal códigos 2FA
  private codigos2FA = new Map<string, string>();

  // registro de usuario
  async registrar(dto: RegistroDto) {
  return this.usuariosService.crear(dto);
}

  // login: validar credenciales, generar código 2FA y enviarlo a Telegram
  async login(email: string, password: string) {
    //Busca el usuario en la base de datos por email
    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    //Compara la contraseña enviada con la almacenada (encriptada)
    const passwordValido = await bcrypt.compare(
      password,
      usuario.password,
    );

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // generar código
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    this.codigos2FA.set(email, codigo);

    //enviar a Telegram
    await this.telegramService.enviarMensaje(
      `Tu código de acceso es: ${codigo}`,
    );

    return {
      message: 'Código enviado a Telegram',
    };
  }

  // verificación del código 2FA, generación del token JWT
  async verificarCodigo(email: string, codigo: string) {
    const codigoGuardado = this.codigos2FA.get(email);

    if (!codigoGuardado || codigoGuardado !== codigo) {
      throw new UnauthorizedException('Código inválido');
    }

    const usuario = await this.usuariosService.buscarPorEmail(email);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    
    //información que se incluirá en el token JWT
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
    };

    //Elimina el código usado (para que no se reutilice)
    this.codigos2FA.delete(email);
    
    // Genera el token JWT y lo retorna
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}