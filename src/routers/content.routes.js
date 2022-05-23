import express from "express";
const { Router } = express;
import { checkAuthentication } from "../controllers/middlewares";
import { renderHomePage, renderUserProfile, renderCart, postCart, renderAvatar, removeProduct, purchasedCart, emptyCart,   } from "../controllers/functions";

const contentRouter = Router();

contentRouter.get("/home", checkAuthentication, renderHomePage);

contentRouter.get("/profile", checkAuthentication, renderUserProfile);

contentRouter.get("/cart", checkAuthentication, renderCart);

contentRouter.post("/cart/:id", checkAuthentication, postCart )

contentRouter.post("/cart/deleteProd/:id", checkAuthentication, removeProduct)

contentRouter.get("/cart/purchased", checkAuthentication, purchasedCart)

contentRouter.post("/cart/empty", checkAuthentication, emptyCart)

contentRouter.get("/avatar", checkAuthentication, renderAvatar);

export default contentRouter;
