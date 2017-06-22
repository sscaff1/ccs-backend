const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/waivers', (req, res, next) => {
  res.send('get waivers');
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/auth/facebook/return',
  passport.authenticate('facebook', {
    successRedirect: '/waivers',
    failureRedirect: '/',
  })
);

module.exports = router;
