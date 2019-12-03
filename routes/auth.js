const firebase = require('firebase');
const firebaseApp = require('firebase/app')

module.exports = {
  isAuthenticated: function (req, res, next) {
    var user = firebase.auth().currentUser;
    if (user !== null) {
      req.user = user;
      next();
    } else {
      res.redirect('/login');
    }
  },
  
  authentication: function(req,res, next) {
    var provider = firebaseApp.auth.OAuthCredential;
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().languageCode = 'pt';
    
  }
}