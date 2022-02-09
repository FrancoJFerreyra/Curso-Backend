import express from "express";
import { Server as webSocketServer } from "socket.io";
import http from "http";
import { v4 as uuid } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = new webSocketServer(server);

const req = require('express/lib/request');
const res = require('express/lib/response');

const products = []

import path from "path";
import { partials } from "handlebars";
const {Router} = express;
const PORT = 8080;
const router = Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

// fetch('./public/layout/main.hbs')

//HBS
const expHbs = require('express-handlebars');

app.engine(
    '.hbs',
    expHbs.engine({
    extname: '.hbs',  
    layoutsDir: __dirname + '/public/layout',
    partialsDir: path.join(__dirname + 'partials'),
    defaultLayout: 'main.hbs' 
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public'))


router.get('/',(req,res) => {
    io.on('connection', (socket) =>{
        console.log('Nueva conexion', socket.id);
    })
    res.render('index', {
        products: products
    });
});

io.on('connection', (socket) =>{;
    socket.on('client:newProduct', (data) =>{
        const newData = {...data, id: uuid()}
        products.push(newData)
        console.log(newData);
        socket.emit('server:newProduct', newData)
    })   
})

app.use('/products',router);

server.listen(PORT, () =>{
    console.log(`Se inicio el server en el puerto: ${PORT}`);
});

