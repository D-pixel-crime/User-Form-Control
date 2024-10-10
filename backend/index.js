import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import session from "express-session";
import "colors";
import { authRouter } from "./handlers/authHandlers/auth.js";
import { connectToDB } from "./database/connectToDB.js";
import { postRouter } from "./handlers/postHandlers/post.js";
import { User } from "./models/User.js";
import { getRouter } from "./handlers/getHandlers/get.js";

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
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

passport.serializeUser((user, done) => {
  done(null, user.id || user.googleId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ googleId: id });
    done(null, user);
  } catch (error) {
    done(error);
  }
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

connectToDB();

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/get", getRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
