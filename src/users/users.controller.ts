import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsuariosService } from './users.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';

import { JwtGuardia } from '../auth/guardias/jwt.guardia';
import { RolesGuardia } from '../auth/guardias/roles.guardia';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crear(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.usuariosService.crear(crearUsuarioDto);
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Get()
  obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.usuariosService.obtenerUno(+id);
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
  ) {
    return this.usuariosService.actualizar(+id, actualizarUsuarioDto);
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.usuariosService.eliminar(+id);
  }
}