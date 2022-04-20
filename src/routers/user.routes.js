import express from "express";
const { Router } = express;

const userRoutes = Router();

userRoutes.get("/login", (req, res) => {
  res.render("login");
});

userRoutes.post("/login", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  req.session.user = user;
  req.session.password = password;
  res.redirect("/products");
});

userRoutes.get("/logout", (req, res) => {
  res.render("logout", {
    userLogout: req.session.user,
  });
  setTimeout(() => {
    req.session.destroy();
    res.redirect("/user/login");
  }, 2000);
});

export default userRoutes;
