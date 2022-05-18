import passport from "passport";
import userMongoContainer from "../daos/userDao";
import productMongoContainer from "../daos/productsDao";
import { io } from "../../express";

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
  const password = req.body.password;
  if (password.length < 4) {
    errors.push({ text: "La contraseña debe contar con 4 o mas caracteres." });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
    });
  } else {
    res.redirect("/content/home");
    console.log({ ...req.body, role: 1 });
    userMongoContainer.saveNewUser({ ...req.body, role: 1});
  }
};

const getHomePage =  async (req, res) =>{
  async (req, res) => {
    const products = await productMongoContainer.listarAll();
    console.log("producto", typeof products);
    if (req.user.role == 2) {
      const admin = req.user.role;
      res.render("index", {
        admin,
        products,
      });
    } else {
      io.on('connection',(socket)=>{
        socket.on('homeClient:buyBtn', async (id)=>{
          console.log('producto comprado id', id);
          const product = await productMongoContainer.getOne(id);
          console.log('Obtener producto', product);
          const idUser = req.user.id
          const saveProduct = userMongoContainer.addProd(product, idUser);
        })
      })
      res.render("index", {
        products,
      });
    }
  }
}

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
  getHomePage,
  getUserProfile,
  getLogout,
  loginError,
};
