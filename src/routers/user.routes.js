import {
  renderLogin,
  postLogin,
  renderRegister,
  newUserRegister,
  renderLogout,
  loginError,
} from "../controllers/functions";
import { checkAuthentication } from "../controllers/middlewares";
import express from "express";
const { Router } = express;

const userRoutes = Router();

userRoutes.get("/login", renderLogin);

userRoutes.post("/login", postLogin);

userRoutes.get("/register", renderRegister);

userRoutes.post("/register", newUserRegister);

userRoutes.get("/logout", checkAuthentication, renderLogout);

userRoutes.get("/loginError", loginError);

export default userRoutes;
