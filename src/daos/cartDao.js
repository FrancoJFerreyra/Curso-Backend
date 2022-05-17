import cart from '../../models/cartSchema';
import mongoContainer from '../containers/mongoDb';
const cartApi = new mongoContainer(cart.cartModel);

module.exports = cartApi;