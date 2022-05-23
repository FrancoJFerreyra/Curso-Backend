import {
  renderLogin,
  postLogin,
  renderRegister,
  postRegister,
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

userRoutes.post("/register", postRegister);

userRoutes.get("/logout", checkAuthentication, renderLogout);

userRoutes.get("/loginError", loginError);

export default userRoutes;
