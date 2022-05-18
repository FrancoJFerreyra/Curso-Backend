import mongoose from "mongoose";
import bussines from "../bussines/DBconfig";

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

  getOne = async (id) => {
    const product = await this.model.findById({ _id: id }); 
    console.log('Producto requerido', product);
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

  delete = async (id) => {
    console.log(id);
    try {
      const deleted = await this.model.deleteOne({ _id: id });
      const countDocs = await this.model.countDocuments({ _id: id });
      console.log(`El producto con id : ${id}, encontrados = ${countDocs}`);
    } catch (err) {
      console.log(err);
    }
  };

  addProd = async (product, idUser) => {
    console.log('Producto', product);
    const user = await this.model.findById({ _id: idUser });
    user.cart.push(product);
    try {
      user.save();
      console.log(`Producto agregado: ${product.title}`);
    } catch (err) {
      console.log(err);
    }
  };

  deleteProd = async (idCart, idProd) => {
    const cart = await this.model.findById({ _id: idCart });
    console.log(`Cart : ${idCart}, product : ${idProd}, ${cart}`);
    const products = cart.products;
    console.log(products[0]._id);
    const find = products.findIndex((e) => e._id === idProd);
    console.log(find);
    products.splice(find, 1);
    try {
      await this.model.updateOne(
        { _id: idCart },
        { $set: { products: products } }
      );
      console.log(`Producto con id: ${idProd} fue eliminado`);
    } catch (err) {
      console.log(err);
    }
  };
}

export default mongoContainer;
