import express from "express";
import { Server as webSocketServer } from "socket.io";
import http from "http";
import { v4 as uuid } from "uuid";
import faker from "@faker-js/faker";
require("dotenv").config();
const messages = require("./src/daos/messagesMongo");
import { normalize, schema } from "normalizr";

const util = require('util')

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
const testRouter = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// fetch('./public/layout/main.hbs')

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

// messages.createChat() Crea el documento que almacena los mensajes
prodRouter.get("/", async (req, res) => {
  io.on("connection", (socket) => {
    console.log("Nueva conexion", socket.id, email);
  });
  res.render("index", {
    email,
  });
});

const userSchema = new schema.Entity("user", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity(
  "content",
  { user: userSchema },
  { idAttribute: "messageId" }
);
const chatSchema = new schema.Entity(
  "chat",
  { user: userSchema, messages: [messageSchema] },
  { idAttribute: "chatId" }
);
let normalizedData = normalize(messages.getMessages(), chatSchema);
console.log("normalizado", normalizedData);

console.log(util.inspect(normalizedData, true, 3 ,true))

io.on("connection", (socket) => {
  socket.emit('Mensajes almacenados', normalizedData);  
  socket.on("client:chat", (data) => {
    console.log(`llego data`);
    messages.saveMessage(data);
    email.push(data);
    socket.emit("server:chat", data);
  });
});

//Faker
const fakeData = (quantity) => {
  const productsFake = [];
  for (let i = 0; i < quantity; i++) {
    productsFake.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      img: faker.image.avatar(100, 100),
    });
  }
  return productsFake;
};
testRouter.get("/", (req, res) => {
  const productsFake = fakeData(5);
  res.render("fake", { productsFake });
  console.log("Productos test:", productsFake);
});

app.use("/products", prodRouter);
app.use("/api/products-test", testRouter);

server.listen(PORT, () => {
  console.log(`Se inicio el server en el puerto: ${PORT}`);
});
