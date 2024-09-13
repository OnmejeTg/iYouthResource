import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/users.js";

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const isMatched = user.matchPassword(password);
        if (!isMatched) {
          return done(null, false, { message: "Invalid password" });
        }
        return done(null, user);
      } catch (error) {
        console.log("Error during Local login: ", error);
        return error;
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log("Error during deserialization: ", error);
    done(error);
  }
});

export default passport;
