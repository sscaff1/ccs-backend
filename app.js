const express = require('express');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes');
require('./models/User');
require('./handler');
require('dotenv').config({ path: 'variables.env' });

const User = mongoose.model('User');

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/return',
      profile: ['id', 'name', 'emails', 'photos'],
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ facebookId: profile.id })
        .then(user => {
          if (user) {
            cb(null, user);
          } else {
            const newUser = new User();
            newUser.facebookId = profile.id;
            newUser.name = profile.displayName;
            newUser
              .save()
              .then(newUserAfterAdd => cb(null, newUserAfterAdd))
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
  )
);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);

module.exports = app;
