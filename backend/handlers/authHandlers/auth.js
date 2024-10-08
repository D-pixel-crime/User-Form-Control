import express from "express";
import passport from "passport";

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
  (req, res) => {
    console.log(`Login successfull`.bgGreen);
    console.log(req.user);

    res.cookie("user", req.user);
    return res.redirect(process.env.FRONTEND_URI);
  }
);

authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log(`Logout successful`.bgRed);
    res.clearCookie("connect.sid");
    res.clearCookie("user");
    return res.status(200).json({ message: "Logout Successfull." });
  });
});

export { authRouter };
