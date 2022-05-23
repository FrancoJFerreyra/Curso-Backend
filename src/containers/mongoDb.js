import mongoose from "mongoose";
import bussines from "../config/DBconfig";

(async () => {
  try {
    const db = await mongoose.connect(bussines.mongoRemote.cnxStr);
    await console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
})();

class mongoContainer {
  constructor(modelSchema) {
    this.model = modelSchema;
  }
  saveNewUser = async (newUser) => {
    const user = new this.model(newUser);
    user.password = await user.encryptPassword(user.password);
    try {
      await user.save();
      console.log(`Usuario guardado : ${newUser.email}`);
    } catch (err) {
      console.log(err);
    }
  };

  becomeAdmin = async (id) => {
    const updateUser = await this.model.findByIdAndUpdate(
      { _id: id },
      { role: 2 }
    );
  };

  getOneDoc = async (id) => {
    const product = await this.model.findById({ _id: id }); 
    console.log('Producto requerido', product._id);
    return product;
  };

  listarAll = async () => {
    const products = await this.model.find();
    return products;
  };

  save = async (data) => {
    console.log("data recibied", data);
    const product = new this.model(data);
    try {
      await product.save();
      console.log("data saved", product);
    } catch (err) {
      console.log(err);
    }
  };

  addProd = async (prod, idUser) => {
    const user = await this.model.findById({ _id: idUser });
    user.cart.push(prod);
    try {
      user.save();
      console.log(`Producto agregado: ${prod.title}`);
    } catch (err) {
      console.log(err);
    }
  };

  deleteProd = async (idProd, userId ) => {
    const user = await this.model.findById({ _id: userId });
    console.log(`Cart : ${userId}, product : ${idProd}`);
    const products = user.cart;
    const find = products.findIndex((e) => e._id == idProd);
    console.log(find);
    products.splice(find, 1);
    try {
      await this.model.updateOne(
        { _id: userId },
        { $set: { cart: products } }
      );
      console.log(`Producto con id: ${idProd} fue eliminado`);
    } catch (err) {
      console.log(err);
    }
  };

  emptyCart = async (userId)=>{
    console.log('id user', userId);
    try {
      await this.model.updateOne(
        { _id: userId },
        { $set: { cart: [] } }
      );
      console.log(`Carrito vaciado`);
    }
    catch (err){
      console.log(err);
    }
  }
}

export default mongoContainer;
