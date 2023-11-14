import { Request, Response, NextFunction } from "express";
import { createUser } from "../controllers/auth/register";
import {  login } from "../controllers/auth/login";
import { response } from "../helpers/misc";
import { RESPONSE_TYPE } from "../helpers/customTypes";
import {  loginSchema, registrationSchema } from "./schemas/auth"

class AuthMiddleware{

    constructor(){
        console.log("AuthMiddleware constructor called");
    }

    

public createUser =  (req: Request, res: Response, next: NextFunction) => {

    try{
         
        registrationSchema.validateAsync(req.body)
        .then((data: any)=>{
            
let {name, email, password } = data;
            createUser(name, email, password)
            .then((data: RESPONSE_TYPE)=>{
                
                response(res, data);
                return;
            })
            .catch((err: RESPONSE_TYPE)=>{
                response(res, err);
                return;
            })

        }
        )
        .catch((err: any)=>{
            console.log({err, d: err.details[0]});

            err.details[0].message = err.details[0].message.replace(/"/g, "");
            if(err.details[0].message.includes("fails to match the required pattern")){
            err.details[0].message =    `Invalid ${err.details[0].context.key}`;
            }
            let feedback: RESPONSE_TYPE = {
                message: err.details[0].message,
                data: err.details,
                status: 400,
                statusCode: "FORM_REQUIREMENT_ERROR"
            }
            response(res, feedback);
            return;
        })


}
catch(err){
    let feedback: RESPONSE_TYPE = {
        message: "We're sorry, an unknown error occurred while processing your request. Please try again later or contact our support team if the issue persists",
        data: [],
        status: 500,
        statusCode: "UNKNOWN_ERROR"
    }
    response(res, feedback);
    return;

}


}


public loginUser  =  (req: Request, res: Response, next: NextFunction) => {

    try{
         
        loginSchema.validateAsync(req.body)
        .then((data: any)=>{
            
let { email, password } = data;
login(email, password)
            .then((data: RESPONSE_TYPE)=>{
                
                response(res, data);
                return;
            })
            .catch((err: RESPONSE_TYPE)=>{
                response(res, err);
                return;
            })

        }
        )
        .catch((err: any)=>{
            console.log({err, d: err.details[0]});

            err.details[0].message = err.details[0].message.replace(/"/g, "");
            if(err.details[0].message.includes("fails to match the required pattern")){
            err.details[0].message =    `Invalid ${err.details[0].context.key}`;
            }
            let feedback: RESPONSE_TYPE = {
                message: err.details[0].message,
                data: err.details,
                status: 400,
                statusCode: "FORM_REQUIREMENT_ERROR"
            }
            response(res, feedback);
            return;
        })


}
catch(err){
    let feedback: RESPONSE_TYPE = {
        message: "We're sorry, an unknown error occurred while processing your request. Please try again later or contact our support team if the issue persists",
        data: [],
        status: 500,
        statusCode: "UNKNOWN_ERROR"
    }
    response(res, feedback);
    return;

}


}

}

export default new AuthMiddleware();

