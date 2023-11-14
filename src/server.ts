/*  import DotEnv from "dotenv"

DotEnv.config( ); */

import app from "./app/app";
import {getEnv} from "./app/helpers/getEnv";
import {LogError, ErrorDataType} from "./app/helpers/errorReporting"; 
import { startApp } from "./app/helpers/dbConnect"; 

 
 
  process.on("uncaughtException",(err:Error)=>{
    //
    let error:ErrorDataType = {
        msg:"uncaughtException error found",
        stack:err.stack,
        status:"STRONG",
        time:new Date().toDateString()
    }
LogError(error)



  })

  



  //RESPONSE_TYPE
  let port = getEnv("PORT");
   console.log({port})
  startApp(app,<number>port);  