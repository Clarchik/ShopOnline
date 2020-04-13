import {UserRoles} from './user-roles';

export interface User {
    email?: string;
    password?: string;
    name?: string;
    surname?: string;
    role?: UserRoles;
    _id?: string;
}

