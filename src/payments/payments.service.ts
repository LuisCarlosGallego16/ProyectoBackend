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
  // Inyección de los repositorios necesarios para gestionar pagos, reservas y usuarios
  constructor(
    @InjectRepository(Pago)
    private pagoRepo: Repository<Pago>,

    @InjectRepository(Reserva)
    private reservaRepo: Repository<Reserva>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  // Crea un nuevo pago para una reserva del usuario autenticado
  async crear(dto: CrearPagoDto, usuarioId: number): Promise<Pago> {
    // Busca la reserva que se desea pagar e incluye el usuario dueño de la reserva
    const reserva = await this.reservaRepo.findOne({
      where: { id: dto.reservaId },
      relations: ['usuario'],
    });

    // Si la reserva no existe, lanza una excepción
    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }

    // Valida que la reserva no haya sido pagada anteriormente
    if (reserva.estado === 'pagada') {
      throw new BadRequestException('La reserva ya está pagada');
    }

    // Verifica que el usuario autenticado sea el dueño de la reserva
    if (!reserva.usuario || reserva.usuario.id !== usuarioId) {
      throw new ForbiddenException(
        'No puedes pagar una reserva que no te pertenece',
      );
    }

    // Busca el usuario que está realizando el pago
    const usuario = await this.usuarioRepo.findOne({
      where: { id: usuarioId },
    });

    // Si el usuario no existe, lanza una excepción
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Simula el resultado del pago de forma aleatoria
    const exito = Math.random() > 0.2;

    // Define el estado del pago según el resultado de la simulación
    const estado = exito ? 'aprobado' : 'rechazado';

    // Crea el registro del pago con la información de la reserva y el usuario
    const pago = this.pagoRepo.create({
      monto: reserva.total,
      estado,
      metodo: dto.metodo,
      transaccionId: 'TX-' + Date.now(),
      reserva,
      usuario,
    });

    // Si el pago fue aprobado, actualiza el estado de la reserva a pagada
    if (estado === 'aprobado') {
      reserva.estado = 'pagada';
      await this.reservaRepo.save(reserva);
    }

    // Guarda el pago en la base de datos
    return this.pagoRepo.save(pago);
  }

  // Obtiene la lista de todos los pagos registrados con sus relaciones
  obtenerTodos() {
    return this.pagoRepo.find({
      relations: ['usuario', 'reserva'],
    });
  }
}