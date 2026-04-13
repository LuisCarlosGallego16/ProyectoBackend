import { IsNumber, IsString } from 'class-validator';

// DTO para crear una reserva
export class CrearReservaDto {
  @IsNumber()
  deporteId!: number;

  @IsNumber()
  escenarioId!: number;

  @IsString()
  fecha!: string;

  @IsString()
  horaInicio!: string;

  @IsString()
  horaFin!: string;

  @IsNumber()
  cantidadPersonas!: number;
}