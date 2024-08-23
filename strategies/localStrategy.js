import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/users.js";


passport.serializeUser((user, done) => {
   
    done(null, user);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        console.error("Error in deserializeUser:", error);
        return done(error);
    }
});

export default passport.use(
    new Strategy(
        { usernameField: "username" },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ email:username });
                
                if (!user ||!(await user.matchPassword(password))) {
                    return done(null, false, { message: "Invalid username or password" });
                }
                return done(null, user);
            } catch (error) {
                console.error("Error in local strategy:", error);
                return done(error);
            }
        }
    )
)