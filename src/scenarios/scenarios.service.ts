import { Injectable } from '@nestjs/common';
import { crearEscenarioDto } from './dto/crear-escenario.dto';
import { actualizarEscenarioDto } from './dto/actualizar.dto';

@Injectable()
export class ScenariosService {
    private scenarios = [
        {
            id: 1,
            nombre: 'Cancha de fútbol',
            ubicacion: 'Parque Central',
            capacidadMaxima: 22,
            valorPorHora: 100,
            estado: 'disponible'
        },
        {
            id: 2,
            nombre: 'Cancha de baloncesto',
            ubicacion: 'Gimnasio Municipal',
            capacidadMaxima: 10,
            valorPorHora: 80,
            estado: 'ocupado'
        }
    ];

    obtenerEscenarios() {
        return this.scenarios;
    }

    obtenerEscenarioPorId(id: number) {
        const escenario = this.scenarios.find((scenarios) => scenarios.id === id);
        if (!escenario) {
            return { mensaje: 'Escenario no encontrado' };
        }
        return escenario;
    }

    crearEscenario(crearEscenarioDto: crearEscenarioDto) {
        const nuevoEscenario = {
            id: this.scenarios.length + 1,
            ...crearEscenarioDto
        };
        this.scenarios.push(nuevoEscenario);

        return{
            mensaje: 'Escenario creado exitosamente',
            escenario: nuevoEscenario,
        };
    }

    actualizarEscenario(id: number, actualizarEscenarioDto: actualizarEscenarioDto) {
        const indice = this.scenarios.findIndex((scenarios) => scenarios.id === id);
        if (indice === -1) {
            return { mensaje: 'Escenario con id ${id} no encontrado' };
        }
        this.scenarios[indice] = {
            ...this.scenarios[indice],
            ...actualizarEscenarioDto
        };

        return {
            mensaje: 'Escenario actualizado exitosamente',
            escenario: this.scenarios[indice],
        };
    }

    eliminarEscenario(id: number) {
        const indice = this.scenarios.findIndex((scenarios) => scenarios.id === id);
        if (indice === -1) {
            return { mensaje: 'Escenario con id ${id} no encontrado' };
        }
        const escenarioEliminado = this.scenarios[indice];
        this.scenarios.splice(indice, 1);

        return {
            mensaje: 'Escenario eliminado exitosamente',
            escenario: escenarioEliminado,
        };
    }
}
