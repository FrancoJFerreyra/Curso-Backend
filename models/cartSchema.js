import {Schema,model} from 'mongoose'
import product from './productsSchema'

const cartSchema = new Schema({
    products : [product.productSchema]
},{
    timestamps : true,
    versionKey : false
})

const cartModel = model('Cart', cartSchema);

export default{
    cartSchema,
    cartModel
}