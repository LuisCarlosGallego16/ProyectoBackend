import { IsString, IsNumber } from 'class-validator';

export class CrearHorarioDeporteDto {

  
  @IsString()
  horaInicio!: string;

  @IsString()
  horaFin!: string;

  @IsNumber()
  deporteId!: number;

  
}

