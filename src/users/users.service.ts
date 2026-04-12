import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    obtenerUsuarios() {
        return ['Luis','Carlos'];
    }
}
