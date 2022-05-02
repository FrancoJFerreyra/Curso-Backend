import mongoose from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../../models/userSchema";

passport.use(
  "login",
  new LocalStrategy(
    {
      //El string 'login' permite llamar a la estrategia que declaramos a continuacion
      usernameField: "user",
      passwordField: "password",
    },
    async (username, password, done) => {
      console.log("Usuario recibido", username);
      console.log("Buscado", await userModel.findOne({ user: username }));
      const user = await userModel.findOne({ user: username });
      if (!user) {
        console.log("Usuario no encontrado");
        return done(null, false, {
          message: `Usuario con nombre ${username} no encontrado.`,
        });
      } else {
        const match = await user.matchPassword(password);
        console.log("match", await user.matchPassword(password));
        if (match) {
          console.log("match");
          return done(null, user);
        } else {
          return done(null, false, { message: "Contraseña incorrecta." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  userModel.findById(id, (err, user) => {
    done(err, user);
  });
});
