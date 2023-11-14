import { Request } from "express";

enum STATUSCODE_ENUM {
    UNKNOWN_ERROR,
    FORM_REQUIREMENT_ERROR,
    PAGE_NOT_FOUND, 
    RESOURCE_NOT_FOUND, 
    RESOURCE_ALREADY_EXIST,
    SUCCESS,
    ORIGIN_NOT_ALLOWED,
    UNAUTHORIZED,
    FORBIDDEN,
    INCORRECT_PASSWORD,
    WALLET_NOT_FOUND,
    TICKET_NOT_FOUND,
    INSUFFICIENT_BALANCE,
    LOGIN_FAILED

  }
  
  export type RESPONSE_TYPE = {
    message: string;
    data: any[];
    statusCode: STATUSCODE;
    status: number;
  };
  
    
  export type STATUSCODE = keyof typeof STATUSCODE_ENUM;
    

  export interface GeneralObject {
    [key: string]: any;
  }
  

  export interface MyHttpRequest extends Request {

    userId?: number;
    user_id?: string;
    user_email? : string;
    user_token?: string; 
  }
  
  export type LoginData= {
    email: string; 
    password: string;
    
    }

    export type RegData = {

      email: string;
      password: string;
      name: string;
        
      }

      export interface TokenPayload {
        email: string;
        id: string;
        time: number;
      }

export interface dateOptions { 
  startDate?: string;
  endDate?: string;
// yyyy-mm-dd
}