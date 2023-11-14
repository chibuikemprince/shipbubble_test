// user.ts
import { RESPONSE_TYPE } from '../../helpers/customTypes';
import {  hashPassword } from '../../helpers/misc';
import  User  from '../../models/User';
import Wallet from '../../models/Wallet';

export function createUser(name: string, email: string, password: string): Promise<RESPONSE_TYPE> {
 // const user = await User.create({ name, email, password });

return new Promise((resolve: any, reject: any)=>{
// check if name , email and pasword is not null

if(!name || !email || !password){
let res: RESPONSE_TYPE = {
    data: [],
    message: 'name, email and password are required',
    status: 400,
    statusCode: "FORM_REQUIREMENT_ERROR"
}

    reject(res);
    return

}
else if(!name.length || !email.length || !password.length){
  let res: RESPONSE_TYPE = {
      data: [],
      message: 'name, email and password are required',
      status: 400,
      statusCode: "FORM_REQUIREMENT_ERROR"
  }
  
      reject(res);
      return
  
  }
else{
// check if email already exist in database
console.log({msg: "find user"})
 User.findOne({ where: { email } })
  .then((user: any) => {
  //  console.log({exist: user})
    if (user != null) {
      let res: RESPONSE_TYPE = {
        data: [],
        message: 'email already exist',
        status: 403,
        statusCode: "RESOURCE_ALREADY_EXIST"
      }
      reject(res);
      return
    }
    else{
// hash the password
hashPassword(password)
.then((hashData: RESPONSE_TYPE)=>{
    let hash = hashData.data[0];
    console.log({hash})
    User.create({ name, email, password : hash})
    .then((user: any) => {

Wallet.create({
  userId: user.id,
  balance: 0
})
      let res: RESPONSE_TYPE = {
        data: [ ],
        message: 'user created successfully',
        status: 200,
        statusCode: "SUCCESS"
      }
      resolve(res);
      return
    })
    .catch((err: any) => {
       // console.log((err.code))
      let res: RESPONSE_TYPE = {
        data: [],
        message: err.message,
        status: 500,
        statusCode: "UNKNOWN_ERROR"
      }
      reject(res);
      return
    })
})
.catch((err: any) => {
    let res: RESPONSE_TYPE = {
      data: [],
      message: err.message,
      status: 500,
      statusCode: "UNKNOWN_ERROR"
    }
    reject(res);
    return
  })
       

    }
})
.catch( (err: any) => {
    console.log(err.message)
    let res: RESPONSE_TYPE = {
    data: [],
    message: 'error occurred, please try again',
    status: 500,
    statusCode: "UNKNOWN_ERROR"
  }
  reject(res);
  return
})
//find




  }
 // return user;





})

}

 /* 
createUser("Prince Chisomaga", "prince3062@prince.com", "12345")
.then((done: any)=>{
    console.log({done: JSON.stringify(done), reg: true})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), reg: true})
})
  


createUser("Prince Chisomaga", "prince3602@prince.com", "12345")
.then((done: any)=>{
    console.log({done: JSON.stringify(done), reg: true})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err), reg: true})
})
  
 */