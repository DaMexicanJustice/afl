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
  var userEmail = document.getElementById("loginEmail").value;
  var userPassword = document.getElementById("loginPwd").value;
  console.log(userEmail, userPassword);
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function(user) {
    //then
    console.log(user);
    document.cookie = "email="+userEmail+";"+"password="+userPassword;
  });

}

function signOut() {
    firebase.auth().signOut().then(function(){
      authenticate();
    });
}

function isAuthorized() {
    return document.cookie == "" ? false : true;
}