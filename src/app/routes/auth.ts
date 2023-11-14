import { Router } from "express";


import { isTokenCorrect } from "../middlewares/header";
import authMiddleware from "../middlewares/auth";

const pathRouter = Router();
const baseRouter = Router();

pathRouter.post("/register",  authMiddleware.createUser);
pathRouter.post("/login",  authMiddleware.loginUser); 
export default baseRouter.use("/users", pathRouter);

