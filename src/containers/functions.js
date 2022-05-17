import passport from "passport";
import userMongoContainer from "../daos/userDao";
import cartMongoContainer from "../daos/cartDao";
import userSchema from "../../models/userSchema";

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/user/login");
  }
};
const checkAdmin = (req, res, next) => {
  if (req.user.role == 2) {
    next();
  } else {
    const notAdmin =
      "No tiene autorizacion para acceder a la pagina solicitada.";
    res.render("error", {
      notAdmin,
    });
  }
};
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
    const cart = await cartMongoContainer.createCart()
    console.log(cart._id);
    res.redirect("/content/home");
    console.log({ ...req.body, role: 1 });
    userMongoContainer.saveNewUser({ ...req.body, role: 1});
  }
};

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
export default {
  checkAuthentication,
  checkAdmin,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
  loginError,
};
