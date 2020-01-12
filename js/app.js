$(document).ready(function(){
    authenticate();
});

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBMG-wOi-M43KII-za6C8fAO56Jd_Wphc0",
    authDomain: "vintage-games-dk.firebaseapp.com",
    databaseURL: "https://vintage-games-dk.firebaseio.com",
    projectId: "vintage-games-dk",
    storageBucket: "vintage-games-dk.appspot.com",
    messagingSenderId: "761347593076",
    appId: "1:761347593076:web:7e5801b3eb0e94e34ad221",
    measurementId: "G-2BG2L826ME"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function signIn() {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.location('https://damexicanjustice.github.io/afl/dashboard.html'):
    } else {
      // No user is signed in.
    }
  });

}

function authenticate() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        } else {
          window.location = "https://damexicanjustice.github.io/afl/retro.html";
        }
      });
}

function signOut() {
    firebase.auth().signOut().then(function(){
      authenticate();
    });
}