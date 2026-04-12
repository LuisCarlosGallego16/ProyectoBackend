import { Injectable } from '@nestjs/common';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Injectable()
export class UsersService {

  private usuarios: any[] = [];

  async crear(datos: CrearUsuarioDto) {

    const usuario = {
      id: Date.now(),
      correo: datos.correo,
      contrasena: datos.contrasena,
    };

    this.usuarios.push(usuario);
    return usuario;
  }

  async buscarTodos() {
    return this.usuarios;
  }

  async buscarPorId(id: number) {
    return this.usuarios.find(u => u.id === id);
  }

  async buscarPorCorreo(correo: string) {
    return this.usuarios.find(u => u.correo === correo);
  }

  async eliminar(id: number) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    return { mensaje: 'Usuario eliminado' };
  }
}