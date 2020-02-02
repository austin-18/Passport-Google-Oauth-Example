const express = require('express');
const router = express.Router();

const passportGoogle = require('../config/google');


const { checkGoogleAuth } = require('../middleware/auth');

router.get('/notAuth', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(200).json({
    data:'not authenticated'
  })
});

router.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

router.get('/logout', function(req, res, next) {
  req.logout()
  req.session.destroy()
  res.json({
    data: 'Logged out!'
  }).clearCookie('connect.sid')

  //res.redirect('/api/v1/auth/login')
});

router.get('/google', passportGoogle.authenticate('google', {scope : ['profile']/*, prompt : "select_account"*/}));

router.get('/google/callback',
  passportGoogle.authenticate('google', 
  { failureRedirect: 'http://localhost:8080/',successRedirect: 'http://localhost:8080/#/securepage'}));

router.get('/profile', checkGoogleAuth, (req, res) => {
  res.json({
    data:'authenticated'
  })
})

module.exports = router;