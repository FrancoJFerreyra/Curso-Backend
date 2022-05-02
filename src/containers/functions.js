import passport from "passport";
import userMongo from "../daos/userMongo";
import userSchema from "../../models/userSchema";

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/user/login");
  }
};
const getLogin = (req, res) => {
  res.render("login");
};
const postLogin = passport.authenticate("login", {
  failureRedirect: "/user/loginError",
  successRedirect: "/chat",
  failureFlash: true,
});

const getRegister = (req, res) => {
  res.render("register");
};

const postRegister = async (req, res) => {
  const errors = [];
  const user = req.body.user;
  const password = req.body.password;
  if (password.length < 4) {
    errors.push({ text: "La contraseña debe contar con 4 o mas caracteres." });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
    });
  } else {
    res.redirect("/chat");
    userMongo.saveNewUser({
      user: user,
      password: password,
    });
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
  res.render("loginError");
};
export default {
  checkAuthentication,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getLogout,
  loginError,
};
