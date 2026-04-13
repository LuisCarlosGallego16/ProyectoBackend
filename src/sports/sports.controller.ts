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

@Controller('deportes')
export class DeportesController {
  constructor(private readonly deportesService: DeportesService) {}

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Post()
  crear(@Body() dto: CrearDeporteDto) {
    return this.deportesService.crear(dto);
  }

  @Get()
  obtenerTodos() {
    return this.deportesService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.deportesService.obtenerUno(+id);
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() dto: ActualizarDeporteDto) {
    return this.deportesService.actualizar(+id, dto);
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.deportesService.eliminar(+id);
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Post('horarios')
  crearHorario(@Body() dto: CrearHorarioDeporteDto) {
    return this.deportesService.crearHorario(dto);
  }

  @Get(':id/horarios')
  obtenerHorarios(@Param('id') id: string) {
    return this.deportesService.obtenerHorarios(+id);
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Delete('horarios/:id')
  eliminarHorario(@Param('id') id: string) {
    return this.deportesService.eliminarHorario(+id);
  }
}