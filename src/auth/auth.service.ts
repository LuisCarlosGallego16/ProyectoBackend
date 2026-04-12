import { Injectable } from '@nestjs/common';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private servicioUsuarios: UsersService) {}

  async registrar(datos: RegistroDto) {

    const usuarioExistente = await this.servicioUsuarios.buscarPorCorreo(datos.correo);

    if (usuarioExistente) {
      return {
        mensaje: 'El usuario ya existe'
      };
    }

    // 🔐 ENCRIPTAR CONTRASEÑA
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
      return {
        mensaje: 'Usuario no encontrado'
      };
    }

    // 🔑 COMPARAR CONTRASEÑA
    const esValida = await bcrypt.compare(datos.contrasena, usuario.contrasena);

    if (!esValida) {
      return {
        mensaje: 'Contraseña incorrecta'
      };
    }

    return {
      mensaje: 'Inicio de sesión exitoso',
      usuario
    };
  }
}