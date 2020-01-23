const {isAuthenticated} = require('passport');

// Passport checking if user is already logged in (has token)
exports.checkGoogleAuth = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      return next();
    } else {
      // if they aren't redirect them to the home page
      res.redirect('notAuth');
    }
  }