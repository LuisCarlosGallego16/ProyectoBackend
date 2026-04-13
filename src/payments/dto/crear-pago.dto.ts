import { IsNumber, IsString } from 'class-validator';

export class CrearPagoDto {
  @IsNumber()
  reservaId!: number;

  @IsString()
  metodo!: string;
}