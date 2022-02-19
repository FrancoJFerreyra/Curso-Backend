import express from "express";
import { Server as webSocketServer } from "socket.io";
import http from "http";
import { v4 as uuid } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = new webSocketServer(server);

const req = require('express/lib/request');
const res = require('express/lib/response');

//BASE DE DATOS
let products = []

//DESCOMENTAR EN CASO DE ADMIN=FALSE

// const products = {
//     productPrice: 200,
//     productName:'hola'
// }

import path from "path";
import { partials } from "handlebars";
const {Router} = express;
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) =>{
    //VERIFICA CONEXION
    console.log('Nueva conexion', socket.id, products); 
    //ENVIA ARRAY
        socket.emit('server:products',products);
    //RECIBE OBJETO DEL FORM
    socket.on('client:newProduct', (data) =>{
       
        //DEVUELVE OBJ CON ID
        const newData = {...data, id: uuid()};
        products.push(newData);
        io.emit('server:newProduct', newData);

    })
    //ELIMINA EL PRODUCTO QUE SEA IGUAL A PRODID DEL ARRAY Y DEVUELEVE NUEVO ARRAY
    socket.on('client:deleteProd', prodId =>{
        products = products.filter((prod)=> prod.id !== prodId)
        console.log(products);
        //AL PONER IO.EMIT TODOS LOS CLIENTES VEN QUE SE ELIMINA EL OBJ
        // socket.emit('server:products', products)
        io.emit('server:products', products)
    })
    //RECIBE EL ID DEL BTNUPDATE CLICKEADO Y DEVUELVE ESE OBJETO
    socket.on('client:updateId', prodId =>{
        const product = products.find(prod => prod.id === prodId);
        socket.emit('server:selectedProd', product)
    })
    //RECIBE EL OBJETO ACTUALIZADO
    socket.on('client:updateProd', updatedProd =>{
        //CREA UN ARRAY NUEVO PERO CON LA NOTA ACTUALIZADA
        products = products.map(prod =>{
            //VERIFICA SI EXISTE UNA NOTA ACTUALIZADA DENTRO DEL ARRAY
            if (prod.id === updatedProd.id ) {
                prod.productName = updatedProd.title;
                prod.productPrice = updatedProd.price;
                prod.productImg = updatedProd.img;
            }
            return prod
        })
        console.log(products);
        io.emit('server:products',products);
    })
    //ENVIA DATA PARA ADMIN=FALSE
    socket.emit('server:notAdmin', products)

})

server.listen(PORT, () =>{
    console.log(`Se inicio el server en el puerto: ${PORT}`);
});