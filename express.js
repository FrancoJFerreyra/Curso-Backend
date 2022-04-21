import express from "express";
import { Server as webSocketServer } from "socket.io";
import http from "http";
import { v4 as uuid } from "uuid";
import testRouter from "./src/routers/faker.routes";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoStore from "connect-mongo";
require("dotenv").config();
const messages = require("./src/daos/messagesMongo");
import { normalize, schema } from "normalizr";
import userRoutes from "./src/routers/user.routes";

const util = require("util");

const app = express();
const server = http.createServer(app);
const io = new webSocketServer(server);

const req = require("express/lib/request");
const res = require("express/lib/response");

import path from "path";
import { partials } from "handlebars";
import { features } from "process";

const { Router } = express;
const PORT = 3000;
const prodRouter = Router();

//COOKIES
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://FrancoDev:FrancoDev@cluster0.dl6ll.mongodb.net/Clase24",
      mongoOptions: advancedOptions,
    }),
    secret: "shhhh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    },
  })
);

//HBS
const expHbs = require("express-handlebars");

app.engine(
  ".hbs",
  expHbs.engine({
    extname: ".hbs",
    layoutsDir: __dirname + "/public/layout",
    partialsDir: path.join(__dirname + "partials"),
    defaultLayout: "main.hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "public"));
const email = [];

const logoutHbs = '/user/logout';

// messages.createChat() Crea el documento que almacena los mensajes
//SOCKET.IO
prodRouter.get("/", (req, res) => {
  io.on("connection", (socket) => {
    console.log("Nueva conexion", socket.id, email);
      socket.on("client:logout", () => {
        socket.emit('server:redirect', logoutHbs)
        });
  });
  if (req.session.user) {
    console.log("Cookie", req.cookies);
    res.render("index", {
      user: req.session.user,
    });
  } else {
      res.redirect("/user/login");
     };
    }
);


//NORMALIZE
// const userSchema = new schema.Entity("user", {}, { idAttribute: "email" });
// const messageSchema = new schema.Entity(
//   "content",
//   { user: userSchema },
//   { idAttribute: "messageId" }
// );
// const chatSchema = new schema.Entity(
//   "chat",
//   { user: userSchema, messages: [messageSchema] },
//   { idAttribute: "chatId" }
// );
// let normalizedData = normalize(messages.getMessages(), chatSchema);
// console.log("normalizado", normalizedData);

// console.log(util.inspect(normalizedData, true, 3, true));

io.on("connection", (socket) => {
  // socket.emit("Mensajes almacenados", normalizedData);
  socket.on("client:chat", (data) => {
    console.log(`llego data`);
    messages.saveMessage(data);
    email.push(data);
    socket.emit("server:chat", data);
  });
});

app.use("/products", prodRouter);
app.use("/api/products-test", testRouter);
app.use("/user", userRoutes);

server.listen(PORT, () => {
  console.log(`Se inicio el server en el puerto: ${PORT}`);
});
