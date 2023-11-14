import { Sequelize } from 'sequelize';
import { getEnv } from './getEnv';
import   { Application } from 'express';
import { ErrorDataType, LogError } from './errorReporting';

import { exec } from 'child_process'; 
const command: string = 'sequelize db:migrate';

// var DBURI: string = getEnv('DB') as string;
var DBURI: string = <string>process.env.MYSQLDBHOST;
var DBUNAME: string = getEnv('DBUNAME') as string;
var DBNAME: string = getEnv('DBNAME') as string;
var DBPASS: string  = getEnv('DBPASS') as string ;
var DIALECT: string = getEnv('DIALECT') as string; 

console.log({ DBURI });


if (process.env.APP_ENV == 'production') {
  DBURI = getEnv('DB_PRODUCTION') as string;
}


export const sequelize = new Sequelize(DBNAME, DBUNAME, DBPASS, {
  host: DBURI,
  dialect: 'mysql',
  logging: false
});

// Test the database connection


export const startApp = (app: Application, port: number) => {
  sequelize
  .authenticate()
    .then((start) => {
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
      
      
      app.listen(port, () => {
        console.log({
          message: 'App is now running.',
          port,
          DBURI,
          app: `http://localhost:${port}`
        });
      });
    })
    .catch((err) => {
      let myerr: ErrorDataType = {
        msg: 'Error found, app could not start',
        stack: err.stack,
        status: 'STRONG',
        time: new Date().toDateString(),
      };

      console.log({ myerr });
    });
};
