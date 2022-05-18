import passport from "passport";
import userMongoContainer from "../daos/userDao";
import productMongoContainer from "../daos/productsDao";
import { io } from "../../express";
import { send, mailOptions } from "../msjs/nodemailer";

const getLogin = (req, res) => {
  res.render("login");
};
const postLogin = passport.authenticate("login", {
  failureRedirect: "/user/loginError",
  successRedirect: "/content/home",
  failureFlash: true,
});

const getRegister = (req, res) => {
  res.render("register");
};

const postRegister = async (req, res) => {
  const errors = [];
  const {
    avatar,
    email,
    direction,
    user,
    lastname,
    age,
    phone,
    password,
    role,
  } = req.body;
  if (password.length < 4) {
    errors.push({ text: "La contraseña debe contar con 4 o mas caracteres." });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
    });
  } else {
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
      <td>${email}</td>
      <td>${direction}</td>
      <td>${user}</td>
      <td>${lastname}</td>
      <td>${age}</td>
      <td>${phone}</td>
    </tr>
    </table>
    `;
    send(mailOptions);
    res.redirect("/content/home");
    console.log({ ...req.body, role: 1 });
    userMongoContainer.saveNewUser({ ...req.body, role: 1 });
  }
};

const adminAddProds = (req, res) => {
  io.on("connection", (socket) => {
    socket.on("client:newProduct", (data) => {
      console.log("llego data al server");
      productMongoContainer.save(data);
      socket.emit("server:newProduct", data);
    });
  });
  res.render("addProds");
};

const getHomePage = async (req, res) => {
  const products = await productMongoContainer.listarAll();
  if (req.user.role == 2) {
    const admin = req.user.role;
    res.render("index", {
      admin,
      products,
    });
  } else {
    io.on("connection", (socket) => {
      socket.on("homeClient:buyBtn", async (id) => {
        console.log("producto comprado id", id);
        const product = await productMongoContainer.getOne(id);
        const idUser = req.user.id;
        const saveProduct = userMongoContainer.addProd(product, idUser);
      });
    });
    res.render("index", {
      products,
    });
  }
};

const getUserProfile = (req, res) => {
  const { avatar, email, direction, user, lastname, age, phone } = req.user;
  res.render("profile", {
    avatar,
    email,
    direction,
    user,
    lastname,
    age,
    phone,
  });
};

const getCart = async (req, res) => {
  const idUser = req.user.id;
  const cart = req.user.cart;
  io.on("connection", (socket) => {
    socket.on("cartClient: removeProd", (idProd) => {
      console.log("Se recibio un id", idProd);
      const saveProduct = userMongoContainer.deleteProd(idProd, idUser);
    });
    socket.on("client: buyCart", ()=>{ 
      mailOptions.subject = "Nuevo pedido";
      mailOptions.html = '';
      for (const product of cart) {  
        mailOptions.html += `
        <p>Producto:${product.title}, precio:$${product.price}</p>
      `;
      }
      send(mailOptions)
      userMongoContainer.emptyCart(idUser)
    });
    socket.on("client: emptyCart", () =>{
      userMongoContainer.emptyCart(idUser)
    })
  });
  res.render("cart", {
    cart,
  });
};

const getAvatar = (req,res)=>{
  const avatar = req.user.avatar;
  res.render('avatar', avatar)
}

const getLogout = (req, res) => {
  const user = req.user.user;
  res.render("logout", {
    userLogout: user,
  });
  req.session.destroy();
};

const loginError = (req, res) => {
  res.render("error");
};

export {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  adminAddProds,
  getHomePage,
  getUserProfile,
  getCart,
  getAvatar,
  getLogout,
  loginError,
};
