import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearDeporteDto } from './dto/crear-deporte.dto';
import { ActualizarDeportDto } from './dto/actualizar-deport.dto';

@Injectable()
export class SportsService {
    private sports =[
        {
            id: 1,
            nombre: 'Futbol',
            horaInicio: '06:00',
            horaFin: '22:00',
            cantidadJugadoresMinima: 10,
            cantidadJugadoresMaxima: 22,
        },
        {
            id: 2,
            nombre: 'Basketball',
            horaInicio: '06:00',
            horaFin: '22:00',
            cantidadJugadoresMinima: 2,
            cantidadJugadoresMaxima: 4,
        }
    ];

    obtenerDeportes() {
        return this.sports;
    }

    ObtenerDeportePorId(id: number) {
        const deporte = this.sports.find((sports) => sports.id === id);
        if (!deporte) {
            return {
                mensaje: 'Deporte no encontrado con id ${id}',
            };
        }
        return deporte;
    }

    crearDeporte(CrearDeporteDto: CrearDeporteDto) {
        const nuevoDeporte ={
            id: this.sports.length + 1,
            ...CrearDeporteDto
        };
        this.sports.push(nuevoDeporte);

        return{
            mensaje: 'Deporte creado correctamente',
            deporte: nuevoDeporte
        };
    }

    actualizarDeporte(id: number, actualizarDeporteDto: ActualizarDeportDto) {
        const indice = this.sports.findIndex((sports) => sports.id === id);
        if (indice === -1) {
            throw new NotFoundException('Deporte no encontrado con id ${id}');
        }
        this.sports[indice] = { ...this.sports[indice], ...actualizarDeporteDto };
        return {
            mensaje: 'Deporte actualizado correctamente',
            deporte: this.sports[indice]
        };
    }

    eliminarDeporte(id: number) {
        const indice = this.sports.findIndex((sports) => sports.id === id);
        if (indice === -1) {
            throw new NotFoundException('Deporte no encontrado con id ${id}');
        }
        const deporteEliminado = this.sports[indice];
        this.sports.splice(indice, 1);
        return {
            mensaje: 'Deporte eliminado correctamente',
            deporte: deporteEliminado,
        };
    }
}

