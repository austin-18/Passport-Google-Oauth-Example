const express = require('express');
const router = express.Router();

const passportGoogle = require('../config/google');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

router.get('/google', passportGoogle.authenticate('google', {scope : ['profile']}));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
    res.send(req.user);
  });

module.exports = router;