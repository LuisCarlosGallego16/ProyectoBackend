import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { ActualizarReservaDto } from './dto/actualizar-reserva.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  obtenerReservas() {
    return this.reservationsService.obtenerReservas();
  }

  @Get(':id')
  obtenerReservaPorId(@Param('id') id: string) {
    return this.reservationsService.obtenerReservaPorId(Number(id));
  }

  @Post()
  crearReserva(@Body() crearReservaDto: CrearReservaDto) {
    return this.reservationsService.crearReserva(crearReservaDto);
  }

  @Patch(':id')
  actualizarReserva(
    @Param('id') id: string,
    @Body() actualizarReservaDto: ActualizarReservaDto,
  ) {
    return this.reservationsService.actualizarReserva(
      Number(id),
      actualizarReservaDto,
    );
  }

  @Delete(':id')
  eliminarReserva(@Param('id') id: string) {
    return this.reservationsService.eliminarReserva(Number(id));
  }
}