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

// Controlador encargado de manejar las rutas relacionadas con escenarios
@Controller('escenarios')
export class ScenariosController {
  // Inyección del servicio para acceder a la lógica de negocio de escenarios
  constructor(private readonly service: ScenariosService) {}

  // Ruta protegida para que solo el administrador pueda crear un escenario
  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Post()
  crear(@Body() dto: CrearEscenarioDto) {
    return this.service.crear(dto);
  }

  // Ruta pública para obtener la lista de todos los escenarios
  @Get()
  obtenerTodos() {
    return this.service.obtenerTodos();
  }

  // Ruta pública para obtener un escenario específico por su id
  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.service.obtenerUno(+id);
  }

  // Ruta protegida para que solo el administrador pueda actualizar un escenario
  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() dto: ActualizarEscenarioDto) {
    return this.service.actualizar(+id, dto);
  }

  // Ruta protegida para que solo el administrador pueda eliminar un escenario
  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.service.eliminar(+id);
  }
}