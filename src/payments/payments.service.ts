import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pago } from './entity/pago.entity';
import { CrearPagoDto } from './dto/crear-pago.dto';

import { Reserva } from '../reservations/entity/reserva.entity';
import { Usuario } from '../users/entity/usuario.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepo: Repository<Pago>,

    @InjectRepository(Reserva)
    private reservaRepo: Repository<Reserva>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async crear(dto: CrearPagoDto, usuarioId: number): Promise<Pago> {
    const reserva = await this.reservaRepo.findOne({
      where: { id: dto.reservaId },
      relations: ['usuario'],
    });

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }

    if (reserva.estado === 'pagada') {
      throw new BadRequestException('La reserva ya está pagada');
    }

    if (!reserva.usuario || reserva.usuario.id !== usuarioId) {
      throw new ForbiddenException(
        'No puedes pagar una reserva que no te pertenece',
      );
    }

    const usuario = await this.usuarioRepo.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const exito = Math.random() > 0.2;
    const estado = exito ? 'aprobado' : 'rechazado';

    const pago = this.pagoRepo.create({
      monto: reserva.total,
      estado,
      metodo: dto.metodo,
      transaccionId: 'TX-' + Date.now(),
      reserva,
      usuario,
    });

    if (estado === 'aprobado') {
      reserva.estado = 'pagada';
      await this.reservaRepo.save(reserva);
    }

    return this.pagoRepo.save(pago);
  }

  obtenerTodos() {
    return this.pagoRepo.find({
      relations: ['usuario', 'reserva'],
    });
  }
}