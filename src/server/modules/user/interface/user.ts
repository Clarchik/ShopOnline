import { Session } from '../models/session';
import mongoose, { Document } from 'mongoose';
import {Order as IOrder} from '../../../shared/interfaces/order';

export interface UserData extends Document {
    email: string;
    password: string;
    name: string;
    surname: string;
    sessions: Array<Session>;
    orders: Array<IOrder> | Array<string>;
    isActive: boolean;
}

export interface UserModel extends mongoose.Model<UserData> {
    getJWTSecret(): string;
    findByIdAndToken(id: string, token: string): any;
    findByCredentials(email: string, password: string): any;
    checkIfUserExists(email: string): Promise<any>;
    hasRefreshTokenExpired(expiriesAt: number): boolean;
}


