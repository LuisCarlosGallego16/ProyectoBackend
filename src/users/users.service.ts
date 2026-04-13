import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from './entity/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';

@Injectable()
export class UsuariosService {
  // Inyección del repositorio de Usuario para acceder a la base de datos
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepositorio: Repository<Usuario>,
  ) {}

  // Crea un nuevo usuario en el sistema
  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    // Cuenta cuántos usuarios existen actualmente
    const totalUsuarios = await this.usuarioRepositorio.count();

    // Encripta la contraseña antes de guardarla
    const passwordEncriptado = await bcrypt.hash(
      crearUsuarioDto.password,
      10,
    );

    // Crea la instancia del usuario con los datos recibidos
    // Si es el primer usuario del sistema, se le asigna el rol admin
    const usuario = this.usuarioRepositorio.create({
      ...crearUsuarioDto,
      password: passwordEncriptado,
      role: totalUsuarios === 0 ? 'admin' : 'user',
    });

    // Guarda el nuevo usuario en la base de datos
    return this.usuarioRepositorio.save(usuario);
  }

  // Obtiene la lista completa de usuarios
  obtenerTodos(): Promise<Usuario[]> {
    return this.usuarioRepositorio.find();
  }

  // Busca un usuario por su id
  async obtenerUno(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepositorio.findOne({
      where: { id },
    });

    // Si no existe, lanza una excepción
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  // Busca un usuario por su correo electrónico
  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepositorio.findOne({
      where: { email },
    });
  }

  // Actualiza los datos de un usuario existente
  async actualizar(
    id: number,
    actualizarUsuarioDto: ActualizarUsuarioDto,
  ): Promise<Usuario> {
    // Primero verifica que el usuario exista
    const usuario = await this.obtenerUno(id);

    // Si se envía una nueva contraseña, se encripta antes de guardar
    if (actualizarUsuarioDto.password) {
      actualizarUsuarioDto.password = await bcrypt.hash(
        actualizarUsuarioDto.password,
        10,
      );
    }

    // Asigna al usuario los nuevos datos recibidos
    Object.assign(usuario, actualizarUsuarioDto);

    // Guarda los cambios en la base de datos
    return this.usuarioRepositorio.save(usuario);
  }

  // Cambia el rol de un usuario
  async cambiarRol(id: number, role: string): Promise<Usuario> {
    // Primero verifica que el usuario exista
    const usuario = await this.obtenerUno(id);

    // Define los roles permitidos en el sistema
    const rolesValidos = ['user', 'admin'];

    // Valida que el nuevo rol sea correcto
    if (!rolesValidos.includes(role)) {
      throw new ConflictException('Rol inválido');
    }

    // Asigna el nuevo rol al usuario
    usuario.role = role;

    // Guarda el cambio en la base de datos
    return this.usuarioRepositorio.save(usuario);
  }

  // Elimina un usuario del sistema
  async eliminar(id: number): Promise<void> {
    // Primero verifica que el usuario exista
    const usuario = await this.obtenerUno(id);

    // Elimina el usuario encontrado
    await this.usuarioRepositorio.remove(usuario);
  }
}