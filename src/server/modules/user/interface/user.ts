import { Session } from '../models/session';
import mongoose, { Document } from 'mongoose';

export interface UserData extends Document {
    email: string;
    password: string;
    name: string;
    surname: string;
    sessions: Array<Session>;
    orders: any;
}

export interface UserModel extends mongoose.Model<UserData> {
    getJWTSecret(): string;
    findByIdAndToken(id: string, token: string): any;
    findByCredentials(email: string, password: string): any;
    checkIfUserExists(email: string): Promise<any>;
    hasRefreshTokenExpired(expiriesAt: number): boolean;
}


