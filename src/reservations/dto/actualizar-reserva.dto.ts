// DTO para actualizar una reserva
export class ActualizarReservaDto {
    userId?: number;
    scenarioId?: number;
    sportId?: number;
    fecha?: string;
    horaInicio?: string;
    horaFin?: string;
    cantidadPersonas?: number
    valorTotal?: number;
    estado?: string;
}
