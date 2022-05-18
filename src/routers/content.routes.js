import express from "express";
const { Router } = express;

import { checkAuthentication } from "../controllers/middlewares";
import { getHomePage, getUserProfile } from "../controllers/functions";

const contentRouter = Router();

contentRouter.get("/home", checkAuthentication, getHomePage);

contentRouter.get("/profile", checkAuthentication, getUserProfile);

contentRouter.get("/cart", checkAuthentication, (req, res) => {
  res.render("cart");
});

export default contentRouter;
