import { Injectable } from '@nestjs/common';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private servicioUsuarios: UsersService,
    private jwtService: JwtService
  ) {}

  async registrar(datos: RegistroDto) {

    const usuarioExistente = await this.servicioUsuarios.buscarPorCorreo(datos.correo);

    if (usuarioExistente) {
      return { mensaje: 'El usuario ya existe' };
    }

    const hash = await bcrypt.hash(datos.contrasena, 10);

    const usuario = await this.servicioUsuarios.crear({
      correo: datos.correo,
      contrasena: hash,
    });

    return {
      mensaje: 'Usuario registrado correctamente',
      usuario
    };
  }

  async iniciarSesion(datos: LoginDto) {

    const usuario = await this.servicioUsuarios.buscarPorCorreo(datos.correo);

    if (!usuario) {
      return { mensaje: 'Usuario no encontrado' };
    }

    const esValida = await bcrypt.compare(datos.contrasena, usuario.contrasena);

    if (!esValida) {
      return { mensaje: 'Contraseña incorrecta' };
    }

    const payload = { id: usuario.id, correo: usuario.correo };

    const token = this.jwtService.sign(payload);

    return {
      mensaje: 'Inicio de sesión exitoso',
      access_token: token
    };
  }
}