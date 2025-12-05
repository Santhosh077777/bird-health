import {Document }from 'mongoose';
export interface User {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
}
export interface usrerdocument extends User, Document{}