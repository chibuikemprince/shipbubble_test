import { NextFunction, Response } from "express";
import { MyHttpRequest, RESPONSE_TYPE } from "../helpers/customTypes";
import { getEnv } from "../helpers/getEnv";
import { extractTokenContent, response } from "../helpers/misc";
const  secret = getEnv("JWT_SECRET") 


function extractTokenFromHeader(header: string | undefined): string[] | undefined {
    if (header == undefined) {
      return undefined;
    }
    
    const parts = header.split(' ');
    if (parts.length === 3 && parts[0] === 'Bearer') {

        // console.log({part1: parts[1], part2: parts[2] })
      return [parts[1], parts[2] ] ;
    }
    
    return undefined;
  }
   
 export const isTokenCorrect = (req: MyHttpRequest, res: Response, next: NextFunction)=>{

    const authHeader = req.headers.authorization;
     const tokenData = extractTokenFromHeader(authHeader);
     // console.log({authHeader, tokenData})

  if (tokenData != undefined) {
     let token = tokenData[0];
// get token

extractTokenContent(token as string)
.then((verified: RESPONSE_TYPE)=>{
    console.log({verified, data:  verified.data[0]})
    
let {id,
    email ,
    time   
} = verified.data[0];

let user_id = tokenData[1]

console.log({token, user_id})
if(id != user_id){
    let error: RESPONSE_TYPE ={
        data: [],
        message: "invalid login token.",
        status: 400,
        statusCode: "LOGIN_FAILED"
    }
    console.log({error})
    response(res, error);
    return

}
req.userId = id;
req.user_id = id;
req.user_email = email;
req.user_token = token; 

next();


})
.catch((err: RESPONSE_TYPE)=>{
    console.log({err})
    
    response(res, err);
    return;
})


    }
    else{
        let error: RESPONSE_TYPE ={
            data: [],
            message: "invalid login token.",
            status: 400,
            statusCode: "LOGIN_FAILED"
        }
        console.log({error})
        response(res, error);
        return
    }
    
 }
