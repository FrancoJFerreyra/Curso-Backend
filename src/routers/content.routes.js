import express from 'express';
const { Router } = express;
import { checkAuthentication } from '../controllers/middlewares.js';
import {
	renderHomePage,
	renderUserProfile,
	renderCart,
	addProductsToCart,
	renderAvatar,
	removeProduct,
	purchasedCart,
	emptyCart,
} from '../controllers/contentCtrl.js';

const contentRouter = Router();

// contentRouter.get('/home', checkAuthentication, renderHomePage);

// contentRouter.get('/profile', checkAuthentication, renderUserProfile);

// contentRouter.get('/cart', checkAuthentication, renderCart);

// contentRouter.post('/cart/:id', checkAuthentication, addProductsToCart);

// contentRouter.post('/cart/deleteProd/:id', checkAuthentication, removeProduct);

// contentRouter.get('/cart/purchased', checkAuthentication, purchasedCart);

// contentRouter.get('/cart/empty', checkAuthentication, emptyCart);

// contentRouter.get('/avatar', checkAuthentication, renderAvatar);

contentRouter.get('/home', renderHomePage);

contentRouter.get('/profile', renderUserProfile);

contentRouter.get('/cart', renderCart);

contentRouter.post('/cart/:id', addProductsToCart);

contentRouter.post('/cart/deleteProd/:id', removeProduct);

contentRouter.get('/cart/purchased', purchasedCart);

contentRouter.get('/cart/empty', emptyCart);

contentRouter.get('/avatar', renderAvatar);

export default contentRouter;
