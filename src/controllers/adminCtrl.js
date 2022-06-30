import { io } from '../express.js';
import productMongoContainer from '../daos/productsDao.js';
import _loggerW from '../config/winston.js';
const adminAddProds = (req, res) => {
	io.on('connection', (socket) => {
		socket.on('client:newProduct', (data) => {
			_loggerW.info(socket.id)
			_loggerW.info(JSON.stringify(data))
			productMongoContainer.save(data);
			socket.emit('server:newProduct', data);
		});
	});
	res.render('addProds');
};
const adminDeleteProd = async (req, res) => {
	const id = req.params.id;
	const deleteProd = await productMongoContainer.deleteProdDB(id);
	if (deleteProd) {
		req.flash('adminAlert', 'Producto eliminado de la DB con éxito.');
	} else {
		req.flash('adminAlert', 'Error al eliminar el producto.');
	}
	res.redirect('/content/home');
};
const adminUpdateProd = ( req, res) => {
	const id = req.params.id
	io.on('connection', (socket) => {
		socket.on('client:newUpdatedProd', (data) => {
			_loggerW.info(JSON.stringify(data))
			productMongoContainer.updateProdDB(id,data);
			socket.emit('server:updatedProd', data);
		});
	});
	const update = `Actualizar producto con id ${id}`;
	res.render('addProds', {update});
};
export { adminAddProds, adminDeleteProd, adminUpdateProd };
