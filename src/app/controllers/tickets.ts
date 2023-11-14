

import { RESPONSE_TYPE, dateOptions } from '../helpers/customTypes'; 
import Ticket from '../models/Order'; 
import { debitWallet } from './wallet';
// Function to create a ticket
import {   Op } from 'sequelize';

export function createTicket(userId: number, amount: number): Promise<RESPONSE_TYPE> {
    return new Promise((resolve, reject) => {
      if (!userId) {
        const response: RESPONSE_TYPE = {
          data: [],
          message: 'User ID is required',
          status: 400,
          statusCode: 'FORM_REQUIREMENT_ERROR',
        };
        reject(response);
        return;
      }
  
      if (amount <= 0) {
        const response: RESPONSE_TYPE = {
          data: [],
          message: 'Amount must be greater than 0',
          status: 400,
          statusCode: 'FORM_REQUIREMENT_ERROR',
        };
        reject(response);
        return;
      }
  
      // Add your implementation to create a ticket here
      Ticket.create({ userId, amount, status:"pending" })
        .then((ticket) => {
          const response: RESPONSE_TYPE = {
            data: [ticket],
            message: 'Ticket created successfully',
            status: 200,
            statusCode: 'SUCCESS',
          };
          resolve(response);
        })
        .catch((error) => {
          const response: RESPONSE_TYPE = {
            data: [],
            message: error.message,
            status: 500,
            statusCode: 'UNKNOWN_ERROR',
          };
          reject(response);
        });
    });
  }
// Function to pay for a ticket from a wallet
export function payWithWallet(userId: number, ticketId: number): Promise<RESPONSE_TYPE> {
    return new Promise((resolve, reject) => {
      // Check the wallet balance before making the payment

    // Retrieve the ticket details
    Ticket.findOne({ where: { id: ticketId , userId, status: "pending"} })
    .then((ticket) => {
      if (!ticket) {
        const response: RESPONSE_TYPE = {
          data: [],
          message: 'Pending ticket not found',
          status: 404,
          statusCode: 'TICKET_NOT_FOUND',
        };
        reject(response);
        return;
      }

     else{

let cost = ticket.amount;
debitWallet(userId, cost, "ticket payment")
.then((done: RESPONSE_TYPE)=>{
ticket.status = "paid";
ticket.save();
let paid: RESPONSE_TYPE  = {
data: [],

  message: 'Ticket paid successfully',
  status: 200,
  statusCode: "SUCCESS"
}

resolve(paid);
return;

})
.catch((error: RESPONSE_TYPE) => {
  
          reject(error);
          return;
        });

     }
    })
    .catch((error) => {
      const response: RESPONSE_TYPE = {
        data: [],
        message: error.message,
        status: 500,
        statusCode: 'UNKNOWN_ERROR',
      };
      reject(response);
    });


 
        
    });
  }
  // Function to retrieve all tickets for a user
  export function getOrdersByUserId(
    userId: number, page: number=1,  option: dateOptions, status?: string): Promise<RESPONSE_TYPE> {
    return new Promise((resolve, reject) => {
        let pageSize: number=20; 

      const offset = (page - 1) * pageSize;
      const limit = pageSize;
  
      const whereCondition: any = { userId };
      if (status) {
        whereCondition.status = status;
      }

      
     // let { startDate, endDate } = option;
      if (option.hasOwnProperty("startDate")  && option.hasOwnProperty("endDate") ) {
        if (option.startDate  && option.endDate ) {
        let start = new Date(option.startDate);
        let end = new Date(option.endDate);
        whereCondition.createdAt = { [Op.between]: [start, end] };
      }
    }
//  console.log({whereCondition});
  
      Ticket.findAndCountAll({ where: whereCondition, offset, limit, order: [['id', "desc"]] })
        .then((result) => {
          const { count, rows } = result;
          const totalPages = Math.ceil(count / pageSize);
  
          const response: RESPONSE_TYPE = {
            data: [{data: rows, meta:{
                page,
                pageSize,
                totalItems: count,
                totalPages,
              }}],
            message: 'Tickets retrieved successfully',
            status: 200,
            statusCode: 'SUCCESS',
            
          };
          resolve(response);
        })
        .catch((error) => {
          const response: RESPONSE_TYPE = {
            data: [],
            message: error.message,
            status: 500,
            statusCode: 'UNKNOWN_ERROR',
          };
          reject(response);
        });
    });
  }


  
/* 
  const options = {
    startDate:  '2023-11-09', // Optional: Specify the start date for the date interval
    endDate:  '2023-11-09', // Optional: Specify the end date for the date interval
  };
  
  getOrdersByUserId( 15, 1, options, "paid")
    .then((response) => {
      console.log({res: JSON.stringify(response)});
    })
    .catch((error) => {
      console.error(error);
    }); */


/* 


  createTicket(15, 500)   
  .then((done: RESPONSE_TYPE) => {
    console.log({

        data: JSON.stringify(done)
    });
  
  })

  .catch((err: any)=>{
    console.log({
          err
    });
  
  
  })
*/

  
/* 

  payWithWallet(15, 24)

  .then((done: RESPONSE_TYPE) => {
    console.log({

        Tdata: JSON.stringify(done)
    });
  
  })

  .catch((err: any)=>{
    console.log({
          Terr: err
    });
  
  
  }) 

  getOrdersByUserId(15, 1, "paid")
  .then((done: RESPONSE_TYPE) => {
    console.log({

        data: JSON.stringify(done)
    });
  
  })

  .catch((err: any)=>{
    console.log({
          err
    });
  
  
  })


 
  getOrdersByUserId(15, 1, "pending")
  .then((done: RESPONSE_TYPE) => {
    console.log({

        data: JSON.stringify(done)
    });
  
  })

  .catch((err: any)=>{
    console.log({
          err
    });
  
  
  })

  */