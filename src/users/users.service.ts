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
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepositorio: Repository<Usuario>,
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    const { email, password } = crearUsuarioDto;

    const usuarioExistente = await this.usuarioRepositorio.findOne({
      where: { email },
    });

    if (usuarioExistente) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordEncriptado = await bcrypt.hash(password, 10);

    const usuario = this.usuarioRepositorio.create({
      ...crearUsuarioDto,
      role: 'user',
      password: passwordEncriptado,
    });

    return await this.usuarioRepositorio.save(usuario);
  }

  obtenerTodos(): Promise<Usuario[]> {
    return this.usuarioRepositorio.find();
  }

  async obtenerUno(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepositorio.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepositorio.findOne({
      where: { email },
    });
  }

  async actualizar(
    id: number,
    actualizarUsuarioDto: ActualizarUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.obtenerUno(id);

    if (actualizarUsuarioDto.password) {
      actualizarUsuarioDto.password = await bcrypt.hash(
        actualizarUsuarioDto.password,
        10,
      );
    }

    Object.assign(usuario, actualizarUsuarioDto);

    return this.usuarioRepositorio.save(usuario);
  }

  async eliminar(id: number): Promise<void> {
    const usuario = await this.obtenerUno(id);
    await this.usuarioRepositorio.remove(usuario);
  }
}