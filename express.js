import express from 'express';
import { Server as webSocketServer } from 'socket.io';
import http from 'http';
import { v4 as uuid } from 'uuid';

import testRouter from './src/routers/faker.routes';
import userRoutes from './src/routers/user.routes';
import chatRouter from './src/routers/chat.routes';

import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';

import { normalize, schema } from 'normalizr';

import passportFile from './src/config/passport';
import passport from 'passport';

import flash from 'connect-flash';

const messages = require('./src/daos/messagesMongo');
const util = require('util');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new webSocketServer(server);

const req = require('express/lib/request');
const res = require('express/lib/response');

import path from 'path';
import { partials } from 'handlebars';
import { features } from 'process';

const PORT = process.env.PORT || 3000;

//SET COOKIES
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl:
        'mongodb+srv://FrancoDev:FrancoDev@cluster0.dl6ll.mongodb.net/Clase26',
      mongoOptions: advancedOptions,
    }),
    secret: 'shhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000
    },
  })
);
//Passport debe inicializarse luego de session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use((req,res,next)=>{
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next()
})
//SET HBS
const expHbs = require('express-handlebars');

app.engine(
  '.hbs',
  expHbs.engine({
    extname: '.hbs',
    layoutsDir: __dirname + '/public/layout',
    partialsDir: path.join(__dirname + 'partials'),
    defaultLayout: 'main.hbs',
  })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'public/views'));
const email = [];

//NORMALIZE
// const userSchema = new schema.Entity('user', {}, { idAttribute: 'id' });
// const messageSchema = new schema.Entity(
//   'content',
//   { user: userSchema },
//   { idAttribute: '_id' }
// );
// const chatSchema = new schema.Entity(
//   'chat',
//   { messages: [messageSchema] },
//   { idAttribute: 'id' }
// );
// let normalizedData = normalize(messages.getMessages(), chatSchema);
// console.log('normalizado', normalizedData);

// console.log(util.inspect(normalizedData, true, 3, true));

app.use('/chat', chatRouter);
app.use('/api/products-test', testRouter);
app.use('/user', userRoutes);

server.listen(PORT, () => {
  console.log(`Se inicio el server en el puerto: ${PORT}`);
});
