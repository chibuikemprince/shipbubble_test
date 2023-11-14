import { Request, Response, NextFunction } from "express";
import { 
    checkAccountBalance,
creditWallet,
debitWallet,
getLedger,
transfer
} from "../controllers/wallet"; 
import { response } from "../helpers/misc";
import { MyHttpRequest, RESPONSE_TYPE } from "../helpers/customTypes";
import {   
balanceSchema,
creditWalletSchema,
debitWalletSchema,
getLedgerSchema,
transferSchema

} from "./schemas/wallet"

class WalletMiddleware{

    constructor(){
        console.log("wallet constructor called");
    }

    

public credit =  (req: MyHttpRequest, res: Response, next: NextFunction) => {

    try{
         
        creditWalletSchema.validateAsync(req.body)
        .then((data: any)=>{
            
let {amount } = data;
creditWallet( <number>req.userId, amount)
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

 

public debit =  (req: MyHttpRequest, res: Response, next: NextFunction) => {

    try{
         
        debitWalletSchema.validateAsync(req.body)
        .then((data: any)=>{
            
let {amount } = data;
debitWallet( <number>req.userId, amount)
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


public balance =  (req: MyHttpRequest, res: Response, next: NextFunction) => {

    try{
         
        balanceSchema.validateAsync(req.body)
        .then((data: any)=>{
             
checkAccountBalance( <number>req.userId)
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


public ledger =  (req: MyHttpRequest, res: Response, next: NextFunction) => {

    try{
         
        getLedgerSchema.validateAsync(req.body)
        .then((data: any)=>{
           let { startDate, endDate, page} = data;  
            getLedger( <number>req.userId, page, {startDate, endDate})
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

 
public transfer =  (req: MyHttpRequest, res: Response, next: NextFunction) => {

    try{
         
        transferSchema.validateAsync(req.body)
        .then((data: any)=>{
           let { to, amount} = data; 
          // console.log({to, amount, uid:req.userId}); 
          let userId = <number>req.userId;
if(userId == to){
   // throw new Error();
    let feedback: RESPONSE_TYPE = {
        message:   "You cannot transfer to yourself",
        data: [],
        status: 401,
        statusCode: "FORM_REQUIREMENT_ERROR"
    }
    response(res, feedback);
    return; 
}
          
           transfer( userId, to, amount)
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

export  default new WalletMiddleware();

