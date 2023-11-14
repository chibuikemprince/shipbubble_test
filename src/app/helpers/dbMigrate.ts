 
import { getEnv } from './getEnv'; 
import { updateConfigJsonFile } from './misc';
import path from 'path';

// var DBURI: string = getEnv('DB') as string;
var DBURI: string = <string>process.env.MYSQLDBHOST;
 

console.log({ DBURI });


if (process.env.APP_ENV == 'production') {
  DBURI = getEnv('DB_PRODUCTION') as string;
}


 
// Test the database connection
let filePath  = path.resolve(__dirname,"../../../config/config.json" );
console.log({ filePath , __dirname})
updateConfigJsonFile(filePath,  DBURI);

 