import { GeneralObject } from "./app/helpers/customTypes";

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
 //console.log({config})

export const ENV: GeneralObject = {
    PORT: 7002,
    DB: config.host,
    DB_PRODUCTION: config.host,
    DBUNAME: config.username,
    DBNAME: config.database ,
    DBPASS: config.password,
    ENV: env,
    DIALECT: config.dialect,
    JWT_SECRET:'2222222222222ddddd#$%&^%%%%wwwwGGdnj'
}

 