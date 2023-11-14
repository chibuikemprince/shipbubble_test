
import { RESPONSE_TYPE, TokenPayload } from '../../helpers/customTypes';
import { createJwtToken, verifyPassword } from '../../helpers/misc';
import  User  from '../../models/User';


export function login( email: string, password: string): Promise<RESPONSE_TYPE> {
    // const user = await User.create({ name, email, password });
   
   return new Promise((resolve: any, reject: any)=>{
   // check if name , email and pasword is not null
   
   if( !email || !password){
   let res: RESPONSE_TYPE = {
       data: [],
       message: 'email and password are required',
       status: 400,
       statusCode: "FORM_REQUIREMENT_ERROR"
   }
   
       reject(res);
       return
   
   }
   else{
   // check if email already exist in database
  
    User.findOne({ where: { email } })
     .then((user: any) => {
     //  console.log({exist: user})
       if (user == null) {
         let res: RESPONSE_TYPE = {
           data: [],
           message: 'account no found, please create account before login',
           status: 404,
           statusCode: "RESOURCE_NOT_FOUND"
         }
         reject(res);
         return
       }
       else{
   // hash the password
   verifyPassword(password, user.password)
   .then((Match: RESPONSE_TYPE)=>{
       
    
    let isMatch: boolean = Match.statusCode== "SUCCESS" ? true : false;
    if(isMatch){

        //login successful
        // generate token
   

                let tokenpayload :TokenPayload = {

                    id: user.id,
                    email: user.email,
                    time: Date.now()
                }



                createJwtToken(tokenpayload)
                .then((token: string)=>{

                    resolve({
                        data:[{user_id: user.id,token}],
                        message:"login successful",
                        status:200,
                        statusCode:"LOGIN_SUCCESSFUL"
                    })
            })
            .catch((err: any)=>{

                reject({
                    data:[],
                    message:"login not successful",
                    status:200,
                    statusCode:"LOGIN_FAILED"
                })
                return;
                
            })            

        }
        else{

            reject({
                data:[],
                message:"incorrect password",
                status:403,
                statusCode:"FORBIDDEN"
            })
            return;
        }

       
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
login( "prince2@prince.com", "12345")
.then((done: any)=>{
    console.log({done: JSON.stringify(done), login: true, password: true})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err),  login: true, password: true})
})


login( "prince2@prince.com", "123450")
.then((done: any)=>{
    console.log({done: JSON.stringify(done), login: true, password: false})
})
.catch((err: any)=>{
    console.log({err: JSON.stringify(err),  login: true, password: false})
}) */