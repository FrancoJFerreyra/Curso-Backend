import express from "express";
const { Router } = express;
import { Server as webSocketServer } from "socket.io";
import http from "http";

import cluster from "cluster";
import { cpus } from "os";

import userRouter from "./src/routers/user.routes";
import contentRouter from "./src/routers/content.routes";
import adminRouter from "./src/routers/admin.routes";

import session from "express-session";
import cookieParser from "cookie-parser";
import mongoStore from "connect-mongo";

import passportFile from "./src/business/passport";
import passport from "passport";

import flash from "connect-flash";

import _loggerW from "./src/config/winston";

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new webSocketServer(server);

import path from "path";

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

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.addCartProduct = req.flash("addCartProduct");
  res.locals.deleteProd = req.flash("deleteProd")
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

//SET CLUSTER 
const clusterMode = process.argv[2] == "CLUSTER"
const numCPUs = cpus().length;

if (clusterMode && cluster.isPrimary) {
  _loggerW.info(`Num CPUs = ${numCPUs}`);
  _loggerW.info(`PID MASTER = ${process.pid}`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on("exit", worker =>{
    _loggerW.info("Worker", worker.process.pid, "died", new Date().toLocaleString());
    cluster.fork();
  })
}
else{
  const PORT = process.env.PORT || 3000;
  
  app.use("/", welcomeRouter);
  app.use("/content", contentRouter);
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);
  
  server.listen(PORT, () => {
  _loggerW.info(`Se inicio el server en el puerto: ${PORT}, PID = ${process.pid}`);
  });
server.on('error', error => {_loggerW.error(error)});
}

export  {io};