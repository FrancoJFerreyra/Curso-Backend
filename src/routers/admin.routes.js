import express from "express";
import { checkAuthentication, checkAdmin} from "../controllers/middlewares";
import { adminAddProds } from "../controllers/functions";
const { Router } = express;
const adminRouter = Router();

adminRouter.get("/addProds", checkAuthentication, checkAdmin, adminAddProds);

export default adminRouter;
