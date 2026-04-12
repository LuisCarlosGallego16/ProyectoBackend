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
            estado: 'activa',
        },
    ];

    private scenarios = [
        {
            id: 1,
            nombre: "Cancha de fútbol",
            capacidadMaxima: 22,
            valorPorHora: 1000,
        },
        {
            id: 2,
            nombre: "Cancha de baloncesto",
            capacidadMaxima: 10,
            valorPorHora: 800,
        },
    ];

    private sports = [
        {
            id: 1,
            nombre: "Fútbol",
            horaInicioPermitida: "08:00",
            horaFinPermitida: "22:00",
            cantidadJugadoresMinima: 2,
            cantidadJugadoresMaxima: 22,
        },
        {
            id: 2,
            nombre: "Baloncesto",
            horaInicioPermitida: "08:00",
            horaFinPermitida: "22:00",
            cantidadJugadoresMinima: 2,
            cantidadJugadoresMaxima: 10,
        },
        {
            id: 3,
            nombre: "Tenis",
            horaInicioPermitida: "08:00",
            horaFinPermitida: "22:00",
            cantidadJugadoresMinima: 2,
            cantidadJugadoresMaxima: 4,
        }
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
        // Validar que el escenario exista
        const escenario = this.scenarios.find(
            (s) => s.id === crearReservaDto.scenarioId,
        );

        if (!escenario) {
            return {
                mensaje: 'El escenario no existe',
            };
        }

        // Validar capacidad del escenario
        if (crearReservaDto.cantidadPersonas > escenario.capacidadMaxima) {
            return {
                mensaje: 'La cantidad de personas supera la capacidad del escenario',
            };
        }

        // Validar que el deporte exista
        const deporte = this.sports.find(
            (s) => s.id === crearReservaDto.sportId,
        );

        if (!deporte) {
            return {
                mensaje: 'El deporte no existe',
            };
        }

        // Validar horario permitido del deporte
        if (
            crearReservaDto.horaInicio < deporte.horaInicioPermitida ||
            crearReservaDto.horaFin > deporte.horaFinPermitida
        ) {
            return {
                mensaje: 'La reserva está fuera del horario permitido para este deporte',
            };
        }

        // Validar cantidad mínima y máxima de jugadores según el deporte
        if (
            crearReservaDto.cantidadPersonas < deporte.cantidadJugadoresMinima ||
            crearReservaDto.cantidadPersonas > deporte.cantidadJugadoresMaxima
        ) {
            return {
                mensaje:
                    'La cantidad de personas no cumple con los límites permitidos para este deporte',
            };
        }

        // Validar que horaInicio sea menor que horaFin
        const inicioMinutos = this.convertirHoraMinuto(crearReservaDto.horaInicio);
        const finMinutos = this.convertirHoraMinuto(crearReservaDto.horaFin);

        if (inicioMinutos >= finMinutos) {
            return {
                mensaje: 'La hora de inicio debe ser menor que la hora de fin',
            };
        }

        // Validar traslape de horario
        const hayTraslape = this.reservations.some((reservation) => {
            return (
                reservation.scenarioId === crearReservaDto.scenarioId &&
                reservation.fecha === crearReservaDto.fecha &&
                crearReservaDto.horaInicio < reservation.horaFin &&
                crearReservaDto.horaFin > reservation.horaInicio
            );
        });

        if (hayTraslape) {
            return {
                mensaje:
                    'No se puede crear la reserva porque hay traslape de horario en ese escenario',
            };
        }

        // Calcular duración y valor total
        const duracionMinutos = finMinutos - inicioMinutos;
        const duracionHoras = duracionMinutos / 60;
        const valorTotal = duracionHoras * escenario.valorPorHora;
    

        // Crear reserva
        const nuevaReserva = {
            id: this.reservations.length + 1,
            ...crearReservaDto,
            valorTotal,
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

    //Funcion para calcular el valor total de la reserva
    private convertirHoraMinuto(hora: string): number {
        const [horas, minutos] = hora.split(':').map(Number);
        return horas * 60 + minutos;
    }
}