import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import { userModel } from "../models/user.models.js";
import { createHash, isValidPassword } from "../utils.js";

let clientID = "clientID";
let clientSecret = "clientSecret";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:8080/session/githubcallback",
        scope: ["user:email"]
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await userModel.findOne({
            email: profile.emails[0].value,
          });
          if (!user) {
            const [first_name, last_name] = profile._json.name.split(" ");
            const newUser = {
              first_name,
              last_name,
              email: profile.emails[0].value,
              password: " ",
              age: " ",
            };
            const savedUser = await userModel.create(newUser);
            done(null, newUser);
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done(`Error:${error}`, false);
        }
      }
    )
  );
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        if (!first_name || !last_name || !email || !age || !password) {
          return done("Missing required fields", false);
        }
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log("User already exist");
            return done(null, false);
          } else {
            const newUser = await userModel.create({
              first_name,
              last_name,
              email,
              age,
              password: createHash(password),
              role,
            });
            return done(null, newUser);
          }
        } catch (error) {
          return done(`Error:${error}`, false);
        }
      }
    )
  );
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.log("User not found");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.log("Invalid Password");
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(`Error:${error}`, false);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
export default initializePassport;
