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
var database = firebase.database();

function signIn() {
  var userEmail = document.getElementById("loginEmail").value;
  var userPassword = document.getElementById("loginPwd").value;
  console.log(userEmail, userPassword);
  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function(user) {
    //then
    console.log(user);
    document.cookie = "email = "+userEmail;
    console.log(document.cookie);
    window.location = "./dashboard.html";
  }).catch(function(error) {
    alert("Forkert brugernavn eller password");
    window.location = "./login.html";
  });
}

function signOut() {
    firebase.auth().signOut().then(function(){
      authenticate();
    });
}

function isAuthorized() {
  console.log(document.cookie);
  if (!document.cookie.search("vintagegamesdkfirebase@gmail.com")) {
      window.location = "./login.html";
  }
}

function writeFirebaseData(id) {
  console.log(id);
  var txt = document.getElementById("text"+id).value;
  console.log(txt);
  firebase.database().ref('pages/landing/').set({
    text: txt
  });
}

function readFirebaseData(page) {
  // once() method
  firebase.database().ref('pages/'+page).on('value',(snap)=>{
    console.log(snap.val());
  });
}