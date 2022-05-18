import {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
  loginError,
} from "../controllers/functions";
import { checkAuthentication } from "../controllers/middlewares";
import express from "express";
const { Router } = express;

const userRoutes = Router();

userRoutes.get("/login", getLogin);

userRoutes.post("/login", postLogin);

userRoutes.get("/register", getRegister);

userRoutes.post("/register", postRegister);

userRoutes.get("/logout", checkAuthentication, getLogout);

userRoutes.get("/loginError", loginError);

export default userRoutes;
