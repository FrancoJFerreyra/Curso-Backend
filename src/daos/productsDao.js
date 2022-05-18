import product from "../../models/productsSchema";
import mongoContainer from "../containers/mongoDb";
const prodsApi = new mongoContainer(product.productModel);

module.exports = prodsApi;
 