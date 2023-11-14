import Joi from "joi";

export const getTicketOrdersSchema = Joi.object({
    
    page: Joi.number().required(),
    status: Joi.string(),
  startDate: Joi.date() ,
  endDate: Joi.date() 
  });

  export const createTicketSchema = Joi.object({
    amount: Joi.number().required()
  });


  export  const payForTicketsSchema = Joi.object({
    ticketId: Joi.number().required()
  });
