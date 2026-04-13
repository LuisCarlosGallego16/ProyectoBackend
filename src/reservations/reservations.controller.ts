import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { ReservationsService } from './reservations.service';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { JwtGuardia } from '../auth/guardias/jwt.guardia';

// Controlador encargado de manejar las rutas relacionadas con reservas
@Controller('reservas')
export class ReservationsController {
  // Inyección del servicio para acceder a la lógica de negocio de reservas
  constructor(private readonly service: ReservationsService) {}

  // Ruta protegida que permite crear una reserva al usuario autenticado
  @UseGuards(JwtGuardia)
  @Post()
  crear(@Body() dto: CrearReservaDto, @Req() req: Request) {
    // Obtiene la información del usuario autenticado desde el request
    const user = req.user as any;

    // Envía los datos de la reserva y el id del usuario al servicio
    return this.service.crear(dto, user.userId);
  }

  // Ruta protegida que permite consultar reservas según el usuario autenticado
  @UseGuards(JwtGuardia)
  @Get()
  obtener(@Req() req: Request) {
    // Obtiene la información del usuario autenticado desde el request
    const user = req.user as any;

    // Si es admin verá todas las reservas, si es user verá solo las suyas
    return this.service.findAll(user);
  }
}