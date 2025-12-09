import { Schema, model } from 'mongoose';
import {userdocument} from '../types/user.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';

const Userschema = new Schema<userdocument>({
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
Userschema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try {
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        return next();
    } catch (error) {
    next(error as Error);
    }
});
Userschema.methods.ValidatePassword=async function(Password:string){
    return await bcrypt.compare(Password,this.password);
};
export default model<userdocument>('User', Userschema);