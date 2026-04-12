import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ScenariosService } from './scenarios.service';
import { crearEscenarioDto } from './dto/crear-escenario.dto';
import { actualizarEscenarioDto } from './dto/actualizar.dto';

@Controller('scenarios')
export class ScenariosController {
    constructor(private readonly scenariosService: ScenariosService) {}

    @Get()
    obtenerEscenarios() {
        return this.scenariosService.obtenerEscenarios();
    }

    @Get(':id')
    obtenerEscenarioPorId(@Param('id') id: string) {
        return this.scenariosService.obtenerEscenarioPorId(Number(id));
    }

    @Post()
    crearEscenario(@Body() crearEscenarioDto: crearEscenarioDto) {
        return this.scenariosService.crearEscenario(crearEscenarioDto);
  }

    @Patch(':id')
    actualizarEscenario(
    @Param('id') id: string,
    @Body() actualizarEscenarioDto: actualizarEscenarioDto,
  ) {
    return this.scenariosService.actualizarEscenario(
      Number(id),
      actualizarEscenarioDto,
    );
  }

    @Delete(':id')
    eliminarEscenario(@Param('id') id: string) {
    return this.scenariosService.eliminarEscenario(Number(id));
  }
}