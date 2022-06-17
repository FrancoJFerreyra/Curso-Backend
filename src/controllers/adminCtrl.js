import { io } from '../express.js';
import productMongoContainer from '../daos/productsDao.js';
import _loggerW from '../config/winston.js';
const adminAddProds = (req, res) => {
	// io.on('connection', (socket) => {
	// 	socket.on('client:newProduct', (data) => {
	// 		console.log('llego data al server');
	// 		productMongoContainer.save(data);
	// 		socket.emit('server:newProduct', data);
	// 	});
	// });
	const data = req.body;
	productMongoContainer.save(data);
	res.send('addProds');
};
const adminDeleteProd = async(req,res) =>{
	const id = req.body.id
	productMongoContainer.deleteProdDB(id);
	res.send('deleted')
}
const adminUpdateProd = async (req,res) =>{
	const {id, title, description, img, price, stock} = req.body;
	const newProd = {
		title,
		description,
		img,
		price,
		stock
	}
	productMongoContainer.updateProdDB(id, newProd);
	res.send('Updated');
}
export {
	adminAddProds,
	adminDeleteProd,
	adminUpdateProd
}