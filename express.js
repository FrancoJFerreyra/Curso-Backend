import express from "express";
const { Router } = express;
import { Server as webSocketServer } from "socket.io";
import http from "http";

import userRouter from "./src/routers/user.routes";
import contentRouter from "./src/routers/content.routes";
import adminRouter from "./src/routers/admin.routes";

import session from "express-session";
import cookieParser from "cookie-parser";
import mongoStore from "connect-mongo";

import passportFile from "./src/bussines/passport";
import passport from "passport";

import flash from "connect-flash";

import loggerW from "./src/winston";

const util = require("util");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new webSocketServer(server);

const req = require("express/lib/request");
const res = require("express/lib/response");

import path from "path";

const PORT = process.env.PORT || 3000;

//SET COOKIES
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://FrancoDev:FrancoDev@cluster0.dl6ll.mongodb.net/Clase26",
      mongoOptions: advancedOptions,
    }),
    secret: "shhhh",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000,
    },
  })
);
//Passport debe inicializarse luego de session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.addCartProduct = req.flash("addCartProduct");
  res.locals.cartAlert = req.flash("cartAlert");
  next();
});
//SET HBS
const expHbs = require("express-handlebars");
import handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
app.engine(
  ".hbs",
  expHbs.engine({
    extname: ".hbs",
    layoutsDir: __dirname + "/public/layout",
    partialsDir: path.join(__dirname + "/public/partials"),
    defaultLayout: "main.hbs",
    handlebars: allowInsecurePrototypeAccess(handlebars),
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "public/views"));

const welcomeRouter = Router();

welcomeRouter.get("/", (req, res) => {
  res.render("welcome");
});

app.use("/", welcomeRouter);
app.use("/content", contentRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

server.listen(PORT, () => {
  console.log(`Se inicio el server en el puerto: ${PORT}`);
});
// server.on('error', error => {loggerW.fatal(error)})

export  {io};