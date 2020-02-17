var version = "1.1.a";

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
  } else {
    return true;
  }
}

function writeFirebaseData(id) {
  console.log(id);
  var txt = document.getElementById("text"+id).value;
  console.log(txt);
  firebase.database().ref('pages/texts/'+id).set({
    text: txt,
    ref: id
  });
}

function readFirebaseData(id) {
  // once() method
  firebase.database().ref('pages/texts/'+id).on('value',(snap)=>{
    console.log(snap.val().text);
    console.log($("#text"+id));
    document.getElementById("text"+id).value = snap.val().text.charAt(0).toUpperCase() + snap.val().text.slice(1);
  });
}

function createFirebaseProduct() {
  console.log("Creating new product...");
  var pCategory = $("#pCategory option:selected").val();
  var pName = $("#pName").val();
  var pDesc = $("#pDesc").val();
  var pPrice = $("#pPrice").val();
  //var pImg = $("#customFile").val();    TODO: HANDLE FILE SELECT, UPLOAD AND GET. FIREBASE STORAGE?
  console.log(pCategory, pName, pDesc, pPrice)
  if (pCategory != "" && pName != "" && pDesc != "" && pPrice != "") {
    firebase.database().ref('products/'+pCategory).push({
      name: pName,
      description: pDesc,
      price: pPrice
      //img: pImg
    });
  }
}

function readFirebaseProducts() {
  var tableHeaderScope = 1;
  var tableDataFields = [];
  var idx = 0;
  // once() method
  firebase.database().ref('products').on('value',(snap)=>{
    // Each category object --> SNES, PS1 etc.
    $.each(snap.val(), function(categoryName, gamesInCategory) {
      // Each game object --> Chrono Trigger, Silent Hill etc.
      $.each(gamesInCategory, function(id, fields){
        $.each(fields, function(fName, fValue){
          tableDataFields.push(fValue);
        });
        $('#products tr:last').after('<tr data-toggle="modal" data-target="#editProductModal"> <th scope="row">'+tableHeaderScope+'</th> <td>'+tableDataFields[idx+1]+'</td> <td>'+tableDataFields[idx]+'</td> <td>'+tableDataFields[idx+2]+'</td> </tr>');
          tableHeaderScope++; 
          idx += 3;
      });
    });
  });
}

function checkVersionOfWebApp() {
  console.log(version);
}
