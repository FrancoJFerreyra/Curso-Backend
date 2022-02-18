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
const products = []

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
    //RECIBE OBJETO DEL FORM
    socket.on('client:newProduct', (data) =>{

        const newData = {...data, id: uuid()};
        products.push(newData);
        //DEVUELVE OBJ CON ID
        socket.emit('server:newProduct', newData);
        //ENVIA OBJ Y ARRAY PARA DELETE 
        socket.emit('server:obj+array',newData,products)
        console.log(products);
        

    })
    //ENVIA DATA PARA ADMIN=FALSE
    socket.emit('server:notAdmin', products)

})

server.listen(PORT, () =>{
    console.log(`Se inicio el server en el puerto: ${PORT}`);
});