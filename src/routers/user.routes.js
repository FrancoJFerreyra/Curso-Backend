import routeFunctions from "../containers/functions";
import express from "express";
const { Router } = express;

const userRoutes = Router();

userRoutes.get("/login", routeFunctions.getLogin);

userRoutes.post("/login", routeFunctions.postLogin);

userRoutes.get("/register", routeFunctions.getRegister);

userRoutes.post("/register", routeFunctions.postRegister);

userRoutes.get(
  "/logout",
  routeFunctions.checkAuthentication,
  routeFunctions.getLogout
);

userRoutes.get("/loginError", routeFunctions.loginError);

export default userRoutes;
