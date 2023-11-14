
 
import { Response } from 'express';
import { RESPONSE_TYPE, TokenPayload } from './customTypes';
import jwt from 'jsonwebtoken';
import { getEnv } from './getEnv'; 
import bcrypt from 'bcryptjs';
import { resolve } from "path";
import { ErrorDataType, LogError } from "./errorReporting";
import { Readable } from 'stream';
import fs from "fs/promises" 
import { exec } from 'child_process'; 
const command: string = 'sequelize db:migrate';

//console.log({dsecret})
/**
 * A function that returns http response as a stream.
 * 
 * @param res - response object.
 * 
 * @param data - data to be sent as response.
 * 
 * @returns - a void promise.
 * 
 * @remarks - this function is used to send response to the client.
 * 
 * @beta
 * 
 * 
 *  
 */
 
export const response = (res: Response, data: RESPONSE_TYPE) => {
  data.status =
    data.status == undefined || data.status == null ? 500 : data.status;
let dataToJson = JSON.stringify(data);

  //res.status(data.status).json(data);
  res.writeHead(data.status, {
    'Content-Length': Buffer.byteLength(dataToJson),
    'Content-Type': 'application/json'
  });
  var stream = new Readable();
  stream.push(dataToJson);    // stream apparently does not accept objects
  stream.push(null);                    // this 
  
stream.pipe(res);

  return;
};


 

/* hashing password */

 
// function to hash password
/**
 * A function that hashes a given password.
 * 
 * @param password  - password to be hashed.
 * @returns - a promise that resolves to a RESPONSE_TYPE object.
 * 
 * @remarks
 * This function uses the bcryptjs library to hash the password.
 * 
 * @beta
 * 
 * @example
 * 
 * hashPassword("password")
 * .then((done: RESPONSE_TYPE)=>{
 * console.log(done);
 * })
 * .catch((err: RESPONSE_TYPE)=>{
 * console.log(err);
 * })
 * 
 */ 
 export const  hashPassword = (password: string): Promise<RESPONSE_TYPE> => {
return new Promise((resolve: any, reject: any)=>{
try{
 bcrypt.genSalt(10)
  .then((salt:any)=>{
    bcrypt.hash(password, salt)
    .then((hash: any)=>{

    let done: RESPONSE_TYPE = {
     data: [hash],
     message: "password hashed.",
     status: 200,
     statusCode: "SUCCESS" 
    }
      resolve(done);
    })
  })
  }
  catch(err: any){

    let error: RESPONSE_TYPE = {
      data: [],
      message: "unknown error occurred, please try again.",
      status: 500,
      statusCode: "FORM_REQUIREMENT_ERROR"
      }

      let error_type: ErrorDataType = {
        msg:err.msg,
        status: "STRONG",
        time:   new Date().toUTCString(),
        stack:err.stack,
        class: <string> <unknown>this
    }
    LogError(error_type);
    reject(error);

  return ;
  }
  
})

}




// function to verify if hash matches password
/**
 * A function that verifies if a given password matches a given hash.
 * 
 * 
 * @param password  - password to be verified.
 * @param hash  - hash to be verified.
 * @returns - a promise that resolves to a RESPONSE_TYPE object.
 * 
 * @remarks
 * This function uses the bcryptjs library to verify the password.
 * 
 * @beta
 * 
 * @example
 * 
 * verifyPassword("password", "hash")
 * .then((done: RESPONSE_TYPE)=>{
 * console.log(done);
 * })
 * .catch((err: RESPONSE_TYPE)=>{
 * console.log(err);
 * })
 * 
 */

  export const  verifyPassword = (password: string, hash: string): Promise<RESPONSE_TYPE> => {
return new Promise((resolve: any, reject: any)=>{
try{
  bcrypt.compare(password, hash)
  .then((match: any)=>{

    if(match){
      let done: RESPONSE_TYPE = {
        data: [match],
        message: "password verified.",
        status: 200,
        statusCode: "SUCCESS" 
        }
          resolve(done);
    }
    else{
      let done: RESPONSE_TYPE = {
        data: [match],
        message: "incorrect password.",
        status: 400,
        statusCode: "INCORRECT_PASSWORD" 
        }
          resolve(done);
    }
    
      }


    )
  }
  catch(err: any){
      
      let error: RESPONSE_TYPE = {
        data: [],
        message: "unknown error occurred, please try again.",
        status: 500,
        statusCode: "FORM_REQUIREMENT_ERROR"
        }
  
        let error_type: ErrorDataType = {
          msg:err.msg,
          status: "STRONG",
          time:   new Date().toUTCString(),
          stack:err.stack,
          class: <string> <unknown>this
      }
      LogError(error_type);
      reject(error);
      return;
  }
  
  })

}




/* hashing password done */

/**
 * A function that creates a jwt token. 
 * 
 * @param payload  - payload to be used in creating the token.
 * @returns - a promise that resolves to a string.
 * 
 * @remarks
 * 
 * This function uses the jsonwebtoken library to create the token.
 * 
 * @beta
 * 
 * @example
 * 
 * 
 * createJwtToken(payload)
 * .then((token: string)=>{
 * console.log(token);
 * })
 * .catch((err: any)=>{
 * console.log(err);
 * })
 * 
 */ 


export  const createJwtToken = (payload: TokenPayload): Promise<string> => {
 
  return new Promise((resolve: any, reject: any)=>{
console.log({payload})
    let secret = getEnv("JWT_SECRET") as string;
//console.log({secret})
     const token = jwt.sign(payload, secret, {
    expiresIn: '24h'
  });

  resolve(token);


  });



  
}
 

/**
 * A function that extracts the content of a jwt token.
 * 
 * @param token  - token to be extracted.
 * @returns - a promise that resolves to a RESPONSE_TYPE object.
 * 
 * 
 * @remarks
 * 
 * This function uses the jsonwebtoken library to extract the content of the token.
 * 
 * @beta
 * 
 * @example
 * 
 * 
 * extractTokenContent(token)
 * .then((done: RESPONSE_TYPE)=>{
 * console.log(done);
 * })
 * .catch((err: any)=>{
 * console.log(err);
 * })
 * 
 */ 

export const  extractTokenContent  =  (token: string): Promise<RESPONSE_TYPE> => {
  
  let secret = getEnv("JWT_SECRET") as string;

return new Promise((resolve:any, reject: any)=>{

  try {
    const decoded = jwt.verify(token, secret);

    if (decoded && typeof decoded === 'object' && 'id' in decoded && 'email' in decoded && 'time' in decoded) {
     
let token = {
  id: decoded.id,
  email: decoded.email as string,
  time: decoded.time
}

console.log({decoded})

let done: RESPONSE_TYPE = {
data: [decoded],
message: "token verified.",
status: 200,
statusCode: "SUCCESS"


} 

     resolve(done)
     
      return ;




    }
  } catch (err) {
    
    let error: RESPONSE_TYPE ={
      data:[],
      message:'Failed to verify JWT token',
      status:500,
      statusCode:"UNKNOWN_ERROR"
        }
         reject(error);

return;

  }

  



})



}

/* jwt done */
function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Usage 

export const updateConfigJsonFile = async (filePath: any, value:any) => {
  try {
    
     await delay(20000);
    const fileData = await fs.readFile(filePath);
    const jsonData = JSON.parse(fileData.toString());
  for(var aa in jsonData){
    console.log({aa, v: jsonData[aa]})
    jsonData[aa].host = value;
  }
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    console.log('JSON file updated successfully!');

//run migration
exec(command, (error: Error | null, stdout: string, stderr: string) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    
    return;
  }
  if (stderr) {
    console.error(`Command execution returned an error: ${stderr}`);
     
    return;
  }
  console.log(`Command output:\n${stdout}`);
  
});




  } catch (error) {
    console.error('Error updating JSON file:', error);
  }
};