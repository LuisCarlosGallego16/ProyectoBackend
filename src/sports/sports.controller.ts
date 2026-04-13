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

import { DeportesService } from './sports.service';

import { CrearDeporteDto } from './dto/crear-deporte.dto';
import { ActualizarDeporteDto } from './dto/actualizar-deporte.dto';
import { CrearHorarioDeporteDto } from './dto/crear-horario-deporte.dto';

import { JwtGuardia } from '../auth/guardias/jwt.guardia';
import { RolesGuardia } from '../auth/guardias/roles.guardia';
import { Roles } from '../auth/decorators/roles.decorator';

// Controlador encargado de manejar las rutas relacionadas con deportes y horarios
@Controller('deportes')
export class DeportesController {
  // Inyección del servicio para acceder a la lógica de negocio de deportes
  constructor(private readonly deportesService: DeportesService) {}

  // Ruta protegida para que solo el administrador pueda crear un deporte
  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Post()
  crear(@Body() dto: CrearDeporteDto) {
    return this.deportesService.crear(dto);
  }

  // Ruta pública para obtener la lista de todos los deportes
  @Get()
  obtenerTodos() {
    return this.deportesService.obtenerTodos();
  }

  // Ruta pública para obtener un deporte específico por su id
  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.deportesService.obtenerUno(+id);
  }

  // Ruta protegida para que solo el administrador pueda actualizar un deporte
  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() dto: ActualizarDeporteDto) {
    return this.deportesService.actualizar(+id, dto);
  }

  // Ruta protegida para que solo el administrador pueda eliminar un deporte
  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.deportesService.eliminar(+id);
  }

  // Ruta protegida para que solo el administrador pueda crear un horario para un deporte
  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Post('horarios')
  crearHorario(@Body() dto: CrearHorarioDeporteDto) {
    return this.deportesService.crearHorario(dto);
  }

  // Ruta pública para obtener los horarios asociados a un deporte
  @Get(':id/horarios')
  obtenerHorarios(@Param('id') id: string) {
    return this.deportesService.obtenerHorarios(+id);
  }

  // Ruta protegida para que solo el administrador pueda eliminar un horario
  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Delete('horarios/:id')
  eliminarHorario(@Param('id') id: string) {
    return this.deportesService.eliminarHorario(+id);
  }
}