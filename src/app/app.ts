 import express, { Application, Request, Response, NextFunction } from 'express';
import { security, allowOnlySpecificOrigins } from './helpers/security'; 
import { response } from './helpers/misc';
import { RESPONSE_TYPE } from './helpers/customTypes';
 import { LogError, ErrorDataType } from './helpers/errorReporting';
import cors from 'cors';
//import bodyParser from 'body-parser';
import { whitelistOrigin } from './helpers/whitelist'; 
import authRoute from "../app/routes/auth"
import ticketRoute from "../app/routes/ticket"
import walletRoute from "../app/routes/wallet"

 
//routes 
const app: Application = express();

 
const corsOptions = {
  allowedHeaders: [
    'Content-Type',

    'Authorization',

    'token' ,
    'x-access-token',
    'x-refresh-token',
    'x-access-token-expires-in',
    'x-refresh-token-expires-in',
    'x-access-token-expires-at',
    'x-refresh-token-expires-at',
    'x-access-token-created-at',
    'x-refresh-token-created-at',

  ],
  origin: "*" /*  (origin: any, callback:any) => {
    // console.log({origin})
    if (whitelistOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  } */,
  methods: 'GET,PUT,POST,DELETE,PATCH',
};


app.use(cors(corsOptions));

app.use(express.json({ limit: '100mb', type: 'application/json' }));
app.use(express.urlencoded({ limit: '100mb', extended: true, parameterLimit:100 }));
 
security(app);


  
app.use('/app/v1', authRoute)
app.use('/app/v1', walletRoute)
app.use('/app/v1', ticketRoute)



app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  let errorLog: ErrorDataType = {
    msg: 'error found: ',
    stack: error.stack,
    status: 'STRONG',
    time: new Date().toDateString(),
  };
  LogError(errorLog);

  let error_res: RESPONSE_TYPE = {
    message: 'error detected, please try again.',
    data: [],
    status: 500,
    statusCode: 'UNKNOWN_ERROR',
  };
  response(res, error_res);
});

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;

  let notFoundRes: RESPONSE_TYPE = {
    message: `${fullURL} page not found`,
    data: [],
    status: 404,
    statusCode: 'PAGE_NOT_FOUND',
  };
  response(res, notFoundRes);
});

process.on("uncaughtException",(error: Error)=>{
  let errorLog: ErrorDataType = {
    msg: 'error found: ',
    stack: error.stack,
    status: 'STRONG',
    time: new Date().toDateString(),
  };
  LogError(errorLog);

   return;
})
export default app;
 