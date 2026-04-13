import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { PaymentsService } from './payments.service';
import { CrearPagoDto } from './dto/crear-pago.dto';

import { JwtGuardia } from '../auth/guardias/jwt.guardia';
import { RolesGuardia } from '../auth/guardias/roles.guardia';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('pagos')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  // Endpoint para crear un nuevo pago
  @UseGuards(JwtGuardia)
  @Post()
  crear(@Body() dto: CrearPagoDto, @Req() req: Request) {
    const user = req.user as any;
    return this.service.crear(dto, user.userId);
  }
  // Endpoint para obtener todos los pagos (solo para administradores)
  @UseGuards(JwtGuardia, RolesGuardia)
  @Roles('admin')
  @Get()
  obtener() {
    return this.service.obtenerTodos();
  }
}