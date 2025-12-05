import { Schema, model } from 'mongoose';
import {usrerdocument} from '../types/user.interface';
import validator from 'validator';
const schema = new Schema<usrerdocument>({
    email:{
        type :String,
        required :[true, 'Email is required'],
        unique :true, 
        createdIndex :{unique:true},
        validate :[validator.isEmail, 'Invalid email address'],
    },
    username:{
        type :String,
        required :true,
        unique :true,
    },
    password:{
        type :String,
        required :true,
        select :false,
        validate :validator.isStrongPassword,
        message :'Password is not strong enough',
    },
    createdAt:{
        type :Date,
        default :Date.now,
    },
},
{timestamps:true}
);
export default model<usrerdocument>('User', schema);