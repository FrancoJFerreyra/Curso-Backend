import express from 'express';
import { checkAuthentication, checkAdmin } from '../controllers/middlewares.js';
import { adminAddProds, adminDeleteProd, adminUpdateProd } from '../controllers/adminCtrl.js';
const { Router } = express;
const adminRouter = Router();

// adminRouter.get("/addProds", checkAuthentication, checkAdmin, adminAddProds);
adminRouter.post('/addProds', adminAddProds);
adminRouter.post('/deleteProds', adminDeleteProd);
adminRouter.post('/updateProd', adminUpdateProd);

export default adminRouter;
