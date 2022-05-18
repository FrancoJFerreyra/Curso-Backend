import express from "express";
import mongoContainer from "../daos/productsDao";
import { checkAuthentication, checkAdmin } from "../controllers/middlewares";
import io from "../../express";
const { Router } = express;
const adminRouter = Router();

adminRouter.get("/addProds", checkAuthentication, checkAdmin, (req, res) => {
  io.on("connection", (socket) => {
    socket.on("client:newProduct", (data) => {
      console.log("llego data al server");
      mongoContainer.save(data);
      socket.emit("server:newProduct", data);
    });
  });
  res.render("addProds");
});

export default adminRouter;
