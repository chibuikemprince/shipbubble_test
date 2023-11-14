import Joi from "joi";

export const creditWalletSchema = Joi.object({
    amount: Joi.number().positive().required()
  });


  export const debitWalletSchema = Joi.object({
    amount: Joi.number().positive().required()
  });


  export const transferSchema = Joi.object({
    to: Joi.number().required(),
    amount: Joi.number().positive().required()
  });

  export  const balanceSchema = Joi.object({

});
 
export const getLedgerSchema = Joi.object({
  page: Joi.number().required(),
  startDate: Joi.date() ,
  endDate: Joi.date() 
});















