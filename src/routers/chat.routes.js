import { Server as webSocketServer } from 'socket.io';
import http from 'http';
import express from 'express';
const { Router } = express;
const app = express();
const server = http.createServer(app);
const io = new webSocketServer(server);

import routerFunctions from '../containers/functions';

const chatRouter = Router();

const logoutHbs = '/user/logout';

chatRouter.get('/',routerFunctions.checkAuthentication, (req, res) => {
    const user = req.user.user;
    console.log(user);
      res.render('index', {
        user
      });
    });
    io.on('connection', (socket) => {
      // socket.emit('Mensajes almacenados', normalizedData);
      socket.on('client:chat', (data) => {
        console.log(`llego data`);
        messages.saveMessage(data);
        email.push(data);
        socket.emit('server:chat', data);
      });
    });

export default chatRouter;