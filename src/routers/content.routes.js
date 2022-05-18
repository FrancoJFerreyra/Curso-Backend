import express from "express";
const { Router } = express;

import { io } from "../../express";
import { checkAuthentication } from "../controllers/middlewares";
import { getHomePage, getUserProfile, getCart, getAvatar  } from "../controllers/functions";

const contentRouter = Router();

contentRouter.get("/home", checkAuthentication, getHomePage);

contentRouter.get("/profile", checkAuthentication, getUserProfile);

contentRouter.get("/cart", checkAuthentication, getCart);

contentRouter.get("/avatar", checkAuthentication, getAvatar);

export default contentRouter;
