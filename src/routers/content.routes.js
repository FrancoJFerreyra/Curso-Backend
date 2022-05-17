import express from "express";
const { Router } = express;

import routerFunctions from "../containers/functions";
import productMongoContainer from "../daos/productsDao";
import cartMongoContainer from "../daos/cartDao";

import io from "../../express";

const contentRouter = Router();

contentRouter.get(
  "/home",
  routerFunctions.checkAuthentication,
  async (req, res) => {
    const products = await productMongoContainer.listarAll();
    console.log("producto", typeof products);
    if (req.user.role == 2) {
      const admin = req.user.role;
      res.render("index", {
        admin,
        products,
      });
    } else {
      // io.on('connection',(socket)=>{
      //   socket.on('homeClient:buyBtn', (id)=>{
      //     const product = productMongoContainer.getOne(id);
      //     const cart = req.user.cart;
      //     if (cart) {
      //       cartMongoContainer.addProd(cart, id)
      //     }
      //     else{

      //     }
      //     const saveProduct = cartMongoContainer.addProd()
      //   })
      // })
      res.render("index", {
        products,
      });
    }
  }
);

contentRouter.get(
  "/profile",
  routerFunctions.checkAuthentication,
  (req, res) => {
    const { avatar, email, direction, user, lastname, age, phone } = req.user;
    res.render("profile", {
      avatar,
      email,
      direction,
      user,
      lastname,
      age,
      phone,
    });
  }
);

contentRouter.get("/cart", routerFunctions.checkAuthentication, (req, res) => {
  res.render("cart");
});

export default contentRouter;
