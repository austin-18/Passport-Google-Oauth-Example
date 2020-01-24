const express = require('express');
const router = express.Router();

const passportGoogle = require('../config/google');


const { checkGoogleAuth } = require('../middleware/auth');

router.get('/notAuth', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send('You were not authorized')
});

router.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

router.get('/logout', function(req, res, next) {
  req.logout()
  req.session.destroy()
  res.clearCookie('connect.sid')
  res.redirect('/api/v1/auth/login')
});

router.get('/google', passportGoogle.authenticate('google', {scope : ['profile']/*, prompt : "select_account"*/}));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/api/v1/auth/notAuth', successRedirect: '/api/v1/auth/profile' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

router.get('/profile', checkGoogleAuth, (req, res) => {
  res.send('you are successfully authenticated')
})

module.exports = router;