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

@Controller('reservas')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @UseGuards(JwtGuardia)
  @Post()
  crear(@Body() dto: CrearReservaDto, @Req() req: Request) {
    const user = req.user as any;
    return this.service.crear(dto, user.userId);
  }

  @UseGuards(JwtGuardia)
  @Get()
  obtener(@Req() req: Request) {
    const user = req.user as any;
    return this.service.findAll(user);
  }
}