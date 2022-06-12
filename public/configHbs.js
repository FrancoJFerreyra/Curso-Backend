import express from 'express'
import path from 'path';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import handlebars from 'handlebars';
const engineConf = {
    extname: '.hbs',
		layoutsDir: path.join(__dirname + '/layout'),
		partialsDir: path.join(__dirname + '/partials'),
		defaultLayout: 'main.hbs',
		handlebars: allowInsecurePrototypeAccess(handlebars),
}
const views = path.join(__dirname, './views');

const publicPath = path.join(__dirname);

export {
    engineConf,
    views,
	publicPath
}
