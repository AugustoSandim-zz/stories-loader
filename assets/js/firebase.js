// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDF1M64jgOC4gLm-pI3NqrHxkHRH6wHG28",
  authDomain: "stories-loader-257604.firebaseapp.com",
  databaseURL: "https://stories-loader-257604.firebaseio.com",
  projectId: "stories-loader-257604",
  storageBucket: "stories-loader-257604.appspot.com",
  messagingSenderId: "40159847187",
  appId: "1:40159847187:web:4aa05005537c85689bf0e6",
  clientId:
    "40159847187-3jjcaufb5v8fgv3dlm3q683rf9d32hcl.apps.googleusercontent.com",
  secretKey: "BTcqs9S2kY5-w7D1R-C5bFGi"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = "pt";
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

function signInUsers() {
  // firebase
  //   .auth()
  //   .signInWithEmailAndPassword(email, pass)
  //   .catch(function(error) {
  //     // Handle Errors here.
  //     let errorCode = error.code;
  //     let errorMessage = error.MESSAGE;
  //     console.log(errorCode);
  //     console.log(errorMessage);
  //   });

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      
      
      window.location.assign('/stories')
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      
      console.log('--------------------', error)
      // ...
    });
}
//check if user is logged in or not
function checkIfLogedIn() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.assign('/stories')
      // if the user is logged in
      console.log(user);
      var emailv = user.email;
      console.log("User is signed in. with email: " + emailv);
      document
        .getElementById("loginButton")
        .setAttribute("style", "display: none;visibility: hidden;");
      document
        .getElementById("logoutButton")
        .setAttribute("style", "display: inline-block;visibility: visible;");
    } else {
      // if the user is not logged in
      console.log("No user is signed in.");
      document
        .getElementById("loginButton")
        .setAttribute("style", "display: block;visibility: visible;");
      document
        .getElementById("logoutButton")
        .setAttribute("style", "display: inline-block;visibility: hidden;");
    }
  });
}

window.onload = function() {
  checkIfLogedIn();
};
function logout() {
  firebase.auth().signOut();
  checkIfLogedIn();
}
