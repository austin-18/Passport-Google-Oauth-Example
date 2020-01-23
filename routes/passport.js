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

router.get('/google', passportGoogle.authenticate('google', {scope : ['profile']}));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/notAuth' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
    res.send(req.user);
  });

router.get('/profile', checkGoogleAuth, (req, res) => {
  res.send('you are successfully authenticated')
})

module.exports = router;