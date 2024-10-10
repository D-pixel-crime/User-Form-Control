import express from "express";
import passport from "passport";
import { User } from "../../models/User.js";
import { Log } from "../../models/Log.js";

const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      let user = await User.findOne({ googleId: req.user.id });
      if (!user) {
        user = await User.create({
          googleId: req.user.id,
          name: req.user.displayName,
          email: req.user.emails[0].value,
          profilePic: req.user.photos[0].value,
        });
      }

      res.cookie("name", encodeURIComponent(user.name));
      res.cookie("email", encodeURIComponent(user.email));
      res.cookie("profilePic", encodeURIComponent(user.profilePic));

      await Log.create({
        user: user.id,
        action: "Login",
      });

      return res.redirect(process.env.FRONTEND_URI);
    } catch (error) {
      console.log(`Error during authentication: ${error}`.bgYellow);
      return res.status(500).json({ message: "Error during authentication." });
    }
  }
);

authRouter.get("/logout", (req, res, next) => {
  req.logout(async (err) => {
    if (err) {
      return next(err);
    }
    console.log(`Logout successful`.bgRed);
    res.clearCookie("connect.sid");
    res.clearCookie("name");
    res.clearCookie("email");
    res.clearCookie("profilePic");
    res.clearCookie("googleId");

    await Log.create({
      user: req.user.id,
      action: "Logout",
    });

    return res.status(200).json({ message: "Logout Successfull." });
  });
});

const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "User not authenticated." });
};

export { authRouter, authenticate };
