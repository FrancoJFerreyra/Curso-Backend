import express from "express";
import mongoContainer from "../daos/productsDao";
import { checkAuthentication, checkAdmin} from "../controllers/middlewares";
import { adminAddProds } from "../controllers/functions";
import {io} from "../../express";
const { Router } = express;
const adminRouter = Router();

adminRouter.get("/addProds", checkAuthentication, checkAdmin, adminAddProds);

export default adminRouter;
