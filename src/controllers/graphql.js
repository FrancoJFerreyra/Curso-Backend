import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { adminAddProds, adminDeleteProd, adminUpdateProd } from './adminCtrl.js';
import { renderHomePage } from './contentCtrl.js';

const schema = buildSchema(`
    type Product{
        title: String!
        description: String!
        img: String!
        price: Int!
        stock: Int!
        _id: ID!
    }

    input ProdInput{
        title: String!
        description: String!
        img: String!
        price: Int!
        stock: Int!
    }

    type Query{
        renderHomePage : [Product]
    }

    type Mutation{
        adminAddProds(input: ProdInput) : Product
        adminDeleteProd(_id: ID) : Product
        adminUpdateProd(_id: ID, input: ProdInput) : Product
    }
`);

const graphConfig = graphqlHTTP({
	schema: schema,
	rootValue: {
		renderHomePage,
        adminAddProds,
        adminDeleteProd,
        adminUpdateProd
	},
    graphiql:true
});

export { graphConfig }