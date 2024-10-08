import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import session from "express-session";
import "colors";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      sameSite: "None",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    console.log(`Login successfull`.bgGreen);
    console.log(req.user);

    res.cookie("user", req.user);
    return res.redirect(process.env.FRONTEND_URI);
  }
);

app.get("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log(`Logout successful`.bgRed);
    res.clearCookie("connect.sid");
    res.clearCookie("user");
    return res.redirect(process.env.FRONTEND_URI);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
