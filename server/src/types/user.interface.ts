import {Document }from 'mongoose';
export interface User {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
}
export interface userdocument extends User, Document{
    ValidatePassword(password:String):String;
}