import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { adminAddProds, adminDeleteProd, adminUpdateProd } from './adminCtrl.js';
import {
	renderHomePage,
	renderUserProfile,
	renderCart,
	addProductsToCart,
	removeProduct,
	purchasedCart,
	emptyCart,
	renderAvatar,
} from './contentCtrl.js';
import {
	renderLogin,
	postLogin,
	renderRegister,
	newUserRegister,
	loginError,
	renderLogout,
} from './login&registerCtrl.js';

const schema = buildSchema(`{
    type Product{
        title: String!
        description: String!
        img: String!
        stock: Int!
        _id: ID!
    }

    type Query{
        renderHomePage()
    }
}`);

