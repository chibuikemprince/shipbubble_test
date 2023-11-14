import { Router } from "express";


import { isTokenCorrect } from "../middlewares/header";
import ticketMiddleware from "../middlewares/tickets";

const pathRouter = Router();
const baseRouter = Router();

pathRouter.post("/order", isTokenCorrect,  ticketMiddleware.createTicket); 
pathRouter.post("/pay", isTokenCorrect,  ticketMiddleware.payForTicket ); 
pathRouter.get("/orders", isTokenCorrect,  ticketMiddleware.getTickets); 




export default baseRouter.use("/tickets", pathRouter);

