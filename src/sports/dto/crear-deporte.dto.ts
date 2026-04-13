import { IsString, IsNumber } from 'class-validator';

export class CrearDeporteDto {
  @IsString()
  nombre!: string;

  @IsNumber()
  cantidadJugadoresMinima!: number;

  @IsNumber()
  cantidadJugadoresMaxima!: number;
}