import { SetMetadata } from '@nestjs/common';
// Definimos una constante que será la "clave" con la que guardaremos los roles.
export const ROLES_KEY = 'roles';
// Creamos un decorador personalizado llamado @Roles()
// Este decorador recibe uno o varios roles (por ejemplo: 'admin', 'user')
// y los guarda como metadata usando la clave ROLES_KEY.
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);