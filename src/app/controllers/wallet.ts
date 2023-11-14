import { Sequelize, Op } from 'sequelize';
import { RESPONSE_TYPE, dateOptions } from '../helpers/customTypes';
import Wallet from '../models/Wallet';
import WalletLedger from '../models/walletLedger';
   

// Function to credit a wallet

export function creditWallet(userId: number, amount: number, info :string= "credit transaction"): Promise<RESPONSE_TYPE> {
  return new Promise((resolve, reject) => {
if(amount==0 || amount<0 || amount> 500000000){
  
  let response: RESPONSE_TYPE = {
    data: [],
    message: 'amount cannot less than zero, equal to zero or greater than 500,000,000',
    status: 401,
    statusCode: 'FORM_REQUIREMENT_ERROR',
  };
  reject(response)
  return;
}

    Wallet.update({ balance: Sequelize.literal(`balance + ${amount}`) }, { where: { userId } })
      .then(([affectedRows]) => {
        console.log({affectedRows})
        if (affectedRows === 0) {


            Wallet.create({userId, balance: amount})
      .then((wallet: any)=>{

        let response: RESPONSE_TYPE = {
            data: [],
            message: 'Wallet credited successfully',
            status: 200,
            statusCode: 'SUCCESS',
          };
          console.log("credit successful.", userId,  amount)


        WalletLedger.create({userId, amount, info})
        .then((walletLedger: any)=>{})
        .catch((error: any)=>{})


          resolve(response);
          return;
      })
      .catch((err: any)=>{

        const response: RESPONSE_TYPE = {
            data: [],
            message: err.message,
            status: 500,
            statusCode: 'UNKNOWN_ERROR',
          };
          reject(response);
          return;
      })

         /*  const response: RESPONSE_TYPE = {
            data: [],
            message: 'Wallet not found',
            status: 404,
            statusCode: 'WALLET_NOT_FOUND',
          };
          reject(response);
          return; */
        }

       else{
        WalletLedger.create({userId, amount, info})
        .then((walletLedger: any)=>{})
        .catch((error: any)=>{})

        let response: RESPONSE_TYPE = {
            data: [],
            message: 'Wallet credited successfully',
            status: 200,
            statusCode: 'SUCCESS',
          };
          resolve(response);
          return;
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
        return;
      });
  });
}

// Function to debit a wallet
export function debitWallet(userId: number, amount: number, info= "debit transaction"): Promise<RESPONSE_TYPE> {
  return new Promise((resolve, reject) => {

    if(amount==0 || amount<0 || amount> 500000000){
  
      let response: RESPONSE_TYPE = {
        data: [],
        message: 'amount cannot less than zero, equal to zero or greater than 500,000,000',
        status: 401,
        statusCode: 'FORM_REQUIREMENT_ERROR',
      };
      reject(response)
      return;
    }


    Wallet.update({ balance: Sequelize.literal(`balance - ${amount}`) }, { where: { userId, balance: { [Op.gte]: amount } } })
      .then(([affectedRows]) => {
        if (affectedRows === 0) {
          const response: RESPONSE_TYPE = {
            data: [],
            message: 'insufficient balance',
            status: 400,
            statusCode: 'INSUFFICIENT_BALANCE',
          };
          reject(response);
          return;
        }
        WalletLedger.create({userId, amount, info})
        .then((walletLedger: any)=>{})
        .catch((error: any)=>{})

        const response: RESPONSE_TYPE = {
          data: [],
          message: 'Wallet debited successfully',
          status: 200,
          statusCode: 'SUCCESS',
        };
        console.log("Debit successful.", userId,  amount)
        resolve(response);
        return;
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
// Function to check the account balance
export function checkAccountBalance(userId: number): Promise<RESPONSE_TYPE> {
  return new Promise((resolve, reject) => {
    Wallet.findOne({ where: { userId } })
      .then((wallet) => {
        if (!wallet) {
          const response: RESPONSE_TYPE = {
            data: [{balance:0}],
            message: 'Wallet not found',
            status: 404,
            statusCode: 'WALLET_NOT_FOUND',
          };
          reject(response);
          return;
        }

        const response: RESPONSE_TYPE = {
          data: [{ balance: wallet.balance }],
          message: 'Account balance retrieved successfully',
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



export function   transfer(userId: number, to: number, amount: number): Promise<RESPONSE_TYPE> {
    return new Promise((resolve, reject) => {

        
debitWallet(userId, amount, "transferred to another user")
.then((debited: any)=>{
    console.log({debited})
    creditWallet(to, amount, "received va transfer")
    .then((done: any)=>{
        done.message = 'Credit was transferred successfully';
        console.log({credited: done})
    resolve(done)
    return;
    
    })
    .catch((err: any)=>{
        reject(err)
        return	;

    })
})

.catch((err: any)=>{
    reject(err)
    return	;
})
    })

}

export function getLedger(userId: number, page: number=1, option: dateOptions): Promise<RESPONSE_TYPE> {
    return new Promise((resolve, reject) => {
        let pageSize: number=20; 

      const offset = (page - 1) * pageSize;
      const limit = pageSize;
  
      const whereCondition: any = { userId };
      
      let { startDate, endDate } = option;
      if (startDate && endDate) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        whereCondition.createdAt = { [Op.between]: [start, end] };
      }
  
      WalletLedger.findAndCountAll({ where: whereCondition, offset, limit,  order: [['id', "desc"]] })
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
            message: 'Ledger retrieved successfully',
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
    endDate:  '2023-11-10', // Optional: Specify the end date for the date interval
  };
  
  getLedger(17,1, options)
.then((done: any)=>{
    console.log({done: JSON.stringify(done), ledger: 17})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), ledger: 17})
})
creditWallet(15, 1000)
.then((done: any)=>{
    console.log({done: JSON.stringify(done), credit: true})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), credit: true})
}) */

  /* 

checkAccountBalance(15)
.then((done: any)=>{
    console.log({done: JSON.stringify(done), balance: true})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), balance: true})
})

 



getLedger(15,1)
.then((done: any)=>{
    console.log({done: JSON.stringify(done), ledger: 15})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), ledger: 15})
})

 


debitWallet(15, 100)
.then((done: any)=>{
    console.log({done: JSON.stringify(done), credit: false})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), credit: false})
})
  */


/* 
  




checkAccountBalance(1)
.then((done: any)=>{
    console.log({done: JSON.stringify(done), balance: true})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), balance: true})
})



checkAccountBalance(2)
.then((done: any)=>{
    console.log({done: JSON.stringify(done), balance: true, user: 2})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), balance: true, user: 2})
})
 */



/* 
*/
/* 
transfer(15, 17, 100)
.then((done: any)=>{
    console.log({done: JSON.stringify(done), transfer: true})
    checkAccountBalance(15)
    .then((done: any)=>{
        console.log({done: JSON.stringify(done), balance: true, user: 1})
    })
    .catch((err: any)=>{
        console.log({err: JSON.stringify(err), balance: true, user: 1})
    })
    

    checkAccountBalance(17)
    .then((done: any)=>{
        console.log({done: JSON.stringify(done), balance: true, user: 2})
    })
    .catch((err: any)=>{
        console.log({err: JSON.stringify(err), balance: true, user: 2})
    })
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), transfer: true})
})  */