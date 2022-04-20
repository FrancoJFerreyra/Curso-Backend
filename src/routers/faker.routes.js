import express from "express";
const {Router} = express;
import faker from "@faker-js/faker";

const testRouter = Router();

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

  export default testRouter