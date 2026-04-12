import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CrearDeporteDto } from './dto/crear-deporte.dto';
import { ActualizarDeportDto } from './dto/actualizar-deport.dto';
import { SportsService } from './sports.service';

@Controller('sports')
export class SportsController {
    constructor(private readonly sportsService: SportsService) {}

    @Get()
    obtenerDeportes() {
        return this.sportsService.obtenerDeportes();
    }

    @Get(':id')
    ObtenerDeportePorId(@Param('id') id: string) {
        return this.sportsService.ObtenerDeportePorId(Number(id));
    }

    @Post()
    crearDeporte(@Body() crearDeporte: CrearDeporteDto) {
        return this.sportsService.crearDeporte(crearDeporte);
    }

    @Patch(':id')
    actualizarDeporte(@Param('id') id: string, @Body() actualizarDeporteDto: ActualizarDeportDto) {
        return this.sportsService.actualizarDeporte(Number(id), actualizarDeporteDto);
    }
    
    @Delete(':id')
    eliminarDeporte(@Param('id') id: string) {
        return this.sportsService.eliminarDeporte(Number(id));
    }
}

