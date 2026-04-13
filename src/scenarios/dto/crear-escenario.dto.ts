import { IsString, IsNumber } from 'class-validator';

export class CrearEscenarioDto {

  @IsString()
  nombre!: string;

  @IsString()
  ubicacion!: string;

  @IsNumber()
  capacidadMaxima!: number;

  @IsNumber()
  valorPorHora!: number;
}