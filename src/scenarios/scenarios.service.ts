import { Injectable } from '@nestjs/common';

@Injectable()
export class ScenariosService {
    obtenerScenarios() {
        return ['Coliseo','Cancha Sintentica'];
    }
}
