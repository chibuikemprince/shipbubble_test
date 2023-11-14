import { Request, Response, NextFunction } from "express";
import { 
  createTicket,
  getOrdersByUserId,
  payWithWallet
} from "../controllers/tickets"; 
import { response } from "../helpers/misc";
import { MyHttpRequest, RESPONSE_TYPE } from "../helpers/customTypes";
import {   
 createTicketSchema,
 getTicketOrdersSchema,
 payForTicketsSchema

} from "./schemas/tickets"

class TicketMiddleware{

    constructor(){
        console.log("wallet constructor called");
    }

    

public createTicket =  (req: MyHttpRequest, res: Response, next: NextFunction) => {

    try{
         
        createTicketSchema.validateAsync(req.body)
        .then((data: any)=>{
            
let {amount } = data;
createTicket( <number>req.userId, amount)
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

 

public payForTicket =  (req: MyHttpRequest, res: Response, next: NextFunction) => {

    try{
         
        payForTicketsSchema.validateAsync(req.body)
        .then((data: any)=>{
            
let {ticketId } = data;
payWithWallet( <number>req.userId, ticketId)
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


public getTickets =  (req: MyHttpRequest, res: Response, next: NextFunction) => {

    try{
         console.log({s1:req.body});

        getTicketOrdersSchema.validateAsync(req.body)
        .then((data: any)=>{
            let {page, status}  = data
            let dateOptions: any  = {}

            if(data.startDate){
                dateOptions.startDate = data.startDate
            } 

            if(data.endDate){
                dateOptions.endDate = data.endDate
            } 


            getOrdersByUserId( <number>req.userId, page,dateOptions, status)
            .then((data: RESPONSE_TYPE)=>{
                
         console.log({s2:req.body});
                response(res, data);
                return;
            })
            .catch((err: RESPONSE_TYPE)=>{
                
         console.log({s3:req.body, err});
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
    
    console.log({s4:req.body});
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

export default  new TicketMiddleware();

