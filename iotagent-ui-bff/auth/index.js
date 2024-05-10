const passport = require('passport');

const config = require("../config")

const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/User')

passport.use('register', new localStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',      
    passReqToCallback: true
  },
  async (req, username, password, callback) => {
    try {
      var user_payload = {
        username : username,
        password: password
      }
      const user = await new User(user_payload);
      return callback(null, user, "Registration Successful");

    } catch (error) {
      return callback(error, null);
    }
  }
)
);

passport.use('login', new localStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({username: username });

      if (!user) {
        return done(null, false, "User not found");
      }

      const validate = await user.comparePassword(password);

      if (!validate) {
        return done(null, false, "Wrong Password" );
      }

      return done(null, user, "Login Succesful" );
    } catch (error) {
      return done(error);
    }
  }
)
);

passport.use(
new JWTstrategy(
  {
    jwtFromRequest: ExtractJWT.fromHeader('auth_token'),
    secretOrKey: config.auth_secret
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
)
);