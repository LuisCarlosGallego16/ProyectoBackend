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

import { ScenariosService } from './scenarios.service';
import { CrearEscenarioDto } from './dto/crear-escenario.dto';
import { ActualizarEscenarioDto } from './dto/actualizar.dto';

import { JwtGuardia } from '../auth/guardias/jwt.guardia';
import { RolesGuardia } from '../auth/guardias/roles.guardia';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('escenarios')
export class ScenariosController {
  constructor(private readonly service: ScenariosService) {}

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Post()
  crear(@Body() dto: CrearEscenarioDto) {
    return this.service.crear(dto);
  }

  @Get()
  obtenerTodos() {
    return this.service.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.service.obtenerUno(+id);
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() dto: ActualizarEscenarioDto) {
    return this.service.actualizar(+id, dto);
  }

  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.service.eliminar(+id);
  }
}