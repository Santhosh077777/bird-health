import { Request, Response } from 'express';
import { NextFunction } from 'express';
import UserModel from '../models/user';
import {userdocument} from '../types/user.interface';
import {Error} from 'mongoose';
import jwt from 'jsonwebtoken';
import {secret} from '../config'
const normalizeduser = (user:userdocument) =>{
    const token = jwt.sign({id:user.id,email:user.email},secret);
    return{
        email:user.email,
        username:user.username,
        id:user.id,
        token
    };
};
export const register = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const newUser = new UserModel({
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
        })
        console.log("user",newUser);
        const saveduser = await newUser.save();
        console.log("saveduser",saveduser);
        res.status(201).json({message:'user reg sucessfull', user:normalizeduser(saveduser)})
    }catch(error){
        if(error instanceof Error.ValidationError){
            const message = Object.values(error.errors).map(error=>error.message);
            res.status(422).json(message);
        }
        next(error);
    }
}