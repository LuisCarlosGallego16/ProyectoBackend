import { IsNumber, IsString } from 'class-validator';


// DTO para crear un pago
// Define qué datos debe enviar el cliente

export class CrearPagoDto {
  @IsNumber()
  reservaId!: number;

  @IsString()
  metodo!: string;
}