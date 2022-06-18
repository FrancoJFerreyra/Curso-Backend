import { io } from '../express.js';
import productMongoContainer from '../daos/productsDao.js';
import _loggerW from '../config/winston.js';
const adminAddProds = ( {input} ) => {
	// io.on('connection', (socket) => {
	// 	socket.on('client:newProduct', (data) => {
	// 		console.log('llego data al server');
	// 		productMongoContainer.save(data);
	// 		socket.emit('server:newProduct', data);
	// 	});
	// });
	const data = input;
	productMongoContainer.save(data);
	return input;
};
const adminDeleteProd = ({_id}) =>{
	console.log(_id);
	return productMongoContainer.deleteProdDB(_id);
}
const adminUpdateProd = ({_id ,input}) =>{
	console.log(_id, input);
	productMongoContainer.updateProdDB(_id, input);
	return input
}
export {
	adminAddProds,
	adminDeleteProd,
	adminUpdateProd
}