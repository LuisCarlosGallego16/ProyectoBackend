import { Injectable } from '@nestjs/common';
import { CrearReservaDto } from './dto/crear-reserva.dto';
import { ActualizarReservaDto } from './dto/actualizar-reserva.dto';

@Injectable()
export class ReservationsService {
  private reservations = [
    {
      id: 1,
      userId: 1,
      scenarioId: 1,
      sportId: 1,
      fecha: '2026-04-12',
      horaInicio: '08:00',
      horaFin: '10:00',
      cantidadPersonas: 10,
      valorTotal: 100000,
      estado: 'activa',
    },
  ];

  obtenerReservas() {
    return this.reservations;
  }

  obtenerReservaPorId(id: number) {
    const reserva = this.reservations.find((reservation) => reservation.id === id);

    if (!reserva) {
      return {
        mensaje: `No se encontró la reserva con id ${id}`,
      };
    }

    return reserva;
  }

  crearReserva(crearReservaDto: CrearReservaDto) {
    const hayTraslape = this.reservations.some((reservation) => { //recorre las reservas existentes para verificar si hay traslape de horario en el mismo escenario
      return (
        reservation.scenarioId === crearReservaDto.scenarioId &&  //verificar que sea el mismo escenario
        reservation.fecha === crearReservaDto.fecha && //verifica que sea el mismo día
        crearReservaDto.horaInicio < reservation.horaFin && //verifica que la hora de inicio de la nueva reserva sea antes de la hora de fin de la reserva existente
        crearReservaDto.horaFin > reservation.horaInicio
      );
    });

    if (hayTraslape) {
      return {
        mensaje:
          'No se puede crear la reserva porque hay traslape de horario en ese escenario',
      };
    }

    const nuevaReserva = {
      id: this.reservations.length + 1,
      ...crearReservaDto,
    };

    this.reservations.push(nuevaReserva);

    return {
      mensaje: 'Reserva creada correctamente',
      reserva: nuevaReserva,
    };
  }

  actualizarReserva(id: number, actualizarReservaDto: ActualizarReservaDto) {
    const indice = this.reservations.findIndex(
      (reservation) => reservation.id === id,
    );

    if (indice === -1) {
      return {
        mensaje: `No se encontró la reserva con id ${id}`,
      };
    }

    this.reservations[indice] = {
      ...this.reservations[indice],
      ...actualizarReservaDto,
    };

    return {
      mensaje: 'Reserva actualizada correctamente',
      reserva: this.reservations[indice],
    };
  }

  eliminarReserva(id: number) {
    const indice = this.reservations.findIndex(
      (reservation) => reservation.id === id,
    );

    if (indice === -1) {
      return {
        mensaje: `No se encontró la reserva con id ${id}`,
      };
    }

    const reservaEliminada = this.reservations[indice];
    this.reservations.splice(indice, 1);

    return {
      mensaje: 'Reserva eliminada correctamente',
      reserva: reservaEliminada,
    };
  }
}