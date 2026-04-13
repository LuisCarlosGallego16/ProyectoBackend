import { PartialType } from '@nestjs/mapped-types';
import { CrearEscenarioDto } from './crear-escenario.dto';

export class ActualizarEscenarioDto extends PartialType(CrearEscenarioDto) {}