import { IsString } from 'class-validator';

export class CambiarRolDto {
  @IsString()
  role!: string;
}