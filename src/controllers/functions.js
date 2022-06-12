import passport from 'passport';
import userMongoContainer from '../daos/userDao';
import productMongoContainer from '../daos/productsDao';
import { io } from '../express';
import { sendEmail, mailOptions } from '../msjs/nodemailer';
import { sendWhatsapp, whatsappOptions } from '../msjs/whatsapp';
import { messageTextOptions, sendTextMessage } from '../msjs/textMsj';
import _loggerW from '../config/winston';

const renderLogin = (req, res) => {
	res.render('login');
};
const postLogin = passport.authenticate('login', {
	failureRedirect: '/user/loginError',
	successRedirect: '/content/home',
	failureFlash: true,
});

const renderRegister = (req, res) => {
	res.render('register');
};

const newUserRegister = async (req, res) => {
	const errors = [];
	const full_phone = req.body.full_phone;
	_loggerW.info(`FULLPHONE: ${full_phone}`);
	_loggerW.info(`${req.body.username}`);
	const { avatar, email, direction, username, lastname, age, password, role } = req.body;
	if (password.length < 4) {
		errors.push({ text: 'La contraseña debe contar con 4 o mas caracteres.' });
	}
	if (errors.length > 0) {
		res.render('register', {
			errors,
		});
	} else {
		const saveUser = userMongoContainer.saveNewUser({ ...req.body, phone: full_phone, role: 1 });
		if (await saveUser) {
			mailOptions.subject = 'Nuevo registro';
			mailOptions.html = `
  <table>
    <thead>
            <tr>
                <th class="col">avatar</th>
                <th class="col">Email</th>
                <th class="col">Direccion</th>
                <th class="col">userName</th>
                <th class="col">lastname</th>
                <th class="col">age</th>
                <th class="col">phone</th>
                <th class="col">role</th>
            </tr>
        </thead>
    <tr>
		<td><img src="${avatar}"></td>
      <td>${email}</td>
      <td>${direction}</td>
      <td>${username}</td>
      <td>${lastname}</td>
      <td>${age}</td>
      <td>${full_phone}</td>
	  <td>${role}</td>
    </tr>
    </table>
    `;
			sendEmail(mailOptions);
			res.redirect('/content/home');
		} else {
			res.render('error');
		}
	}
};

const adminAddProds = (req, res) => {
	io.on('connection', (socket) => {
		socket.on('client:newProduct', (data) => {
			console.log('llego data al server');
			productMongoContainer.save(data);
			socket.emit('server:newProduct', data);
		});
	});
	res.render('addProds');
};

const renderHomePage = async (req, res) => {
	const products = await productMongoContainer.listarAll();
	if (req.user.role == 2) {
		const admin = req.user.role;
		res.render('index', {
			admin,
			products,
		});
	} else {
		res.render('index', {
			products,
		});
	}
};

const renderUserProfile = (req, res) => {
	const { avatar, email, direction, username, lastname, age, phone } = req.user;
	res.render('profile', {
		avatar,
		email,
		direction,
		username,
		lastname,
		age,
		phone,
	});
};

const renderCart = async (req, res) => {
	const userId = req.user.id;
	const userDoc = await userMongoContainer.getOneDoc(userId);
	const cart = userDoc.cart;
	res.render('cart', {
		cart,
		userId,
	});
};

const addProductsToCart = async (req, res) => {
	const prodId = req.params.id;
	const prodDoc = await productMongoContainer.getOneDoc(prodId);
	const userId = req.user.id;
	const addProd = userMongoContainer.addProd(prodDoc, userId);
	req.flash('addCartProduct', 'Producto agregado al carrito.');
	res.redirect('/content/home');
};

const removeProduct = async (req, res) => {
	const prodId = req.params.id;
	const userId = req.user.id;
	const deleteProd = userMongoContainer.deleteProd(prodId, userId);
	req.flash('deleteProd', 'Producto eliminado.');
	res.redirect('/content/cart');
};

const purchasedCart = async (req, res) => {
	const userId = req.user.id;
	const userDoc = await userMongoContainer.getOneDoc(userId);
	const { cart, email, username, phone } = userDoc;
	const subject = `Nuevo pedido de nombre ${username}, email: ${email}. `;
	mailOptions.subject = subject;
	for (const product of cart) {
		mailOptions.html += `
        <ul>
          <li>Nombre del producto: ${product.title}, Precio: $${product.price}</li>
        </ul>
      `;
	}
	sendEmail(mailOptions);
	_loggerW.info('Email enviado');
	whatsappOptions.body = subject;
	sendWhatsapp(whatsappOptions);
	messageTextOptions.body = 'Su pedido se ha confirmado y esta siendo procesado.';
	messageTextOptions.to += phone;
	_loggerW.info(`MessageOptions ${messageTextOptions}`);
	sendTextMessage(messageTextOptions);
	const emptyCart = userMongoContainer.emptyCart(userId);
	req.flash('cartAlert', 'Pedido realizado, gracias por su compra!');
	res.redirect('/content/cart');
};

const emptyCart = async (req, res) => {
	const userId = req.user.id;
	const emptyCart = userMongoContainer.emptyCart(userId);
	req.flash('cartAlert', 'Su carrito se vació con exito');
	res.redirect('/content/cart');
};

const renderAvatar = (req, res) => {
	const avatar = req.user.avatar;
	res.render('avatar', avatar);
};

const renderLogout = (req, res) => {
	const user = req.user.username;
	res.render('logout', {
		userLogout: user,
	});
	req.session.destroy();
};

const loginError = (req, res) => {
	res.render('error');
};

export {
	renderLogin,
	postLogin,
	renderRegister,
	newUserRegister,
	adminAddProds,
	renderHomePage,
	renderUserProfile,
	renderCart,
	addProductsToCart,
	removeProduct,
	purchasedCart,
	emptyCart,
	renderAvatar,
	renderLogout,
	loginError,
};
