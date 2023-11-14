import { Router } from "express";


import { isTokenCorrect } from "../middlewares/header";
import walletMiddleware from "../middlewares/wallet";

const pathRouter = Router();
const baseRouter = Router();

pathRouter.post("/credit", isTokenCorrect,  walletMiddleware.credit);
pathRouter.post("/debit", isTokenCorrect,  walletMiddleware.debit);
pathRouter.get("/balance", isTokenCorrect,  walletMiddleware.balance);

pathRouter.get("/ledger", isTokenCorrect,  walletMiddleware.ledger);
pathRouter.post("/transfer",  isTokenCorrect, walletMiddleware.transfer); 




export default baseRouter.use("/wallet", pathRouter);

