import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsService {
    obtenerReservations(){
        return['Reserva1','Reserva2']
    }
}
