var version = "2.0r";

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

function signIn(userEmail, userPassword) {
  return new Promise(function(resolve, reject) {
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function(user) {
      //then
      resolve(true)
    }).catch(function(error) {
      reject(false);
    });
  });
}

function signInWithForm() {
  var userEmail = document.getElementById("loginEmail").value;
  var userPassword = document.getElementById("loginPwd").value;
  signIn(userEmail, userPassword).then(function(isLoggedOn) {
    document.cookie = "email="+userEmail;
    document.cookie = "pwd="+userPassword;
    window.location = "./dashboard.html";
  }).catch(function(error) {
    alert("Forkert brugernavn eller password. Prøv igen.");
  });
}

function signInWithoutForm(userEmail, userPassword) {
    return signIn(userEmail, userPassword);
}

function signOut() {
    document.cookie ="email=";
    document.cookie ="pwd=";
    window.location = "./login.html";
}

function isAuthorized() {
  signInWithoutForm(checkCookie("email"), checkCookie("pwd")).then(function(isLoggedOn) {
    console.log("We are authorized", isLoggedOn);
  }).catch(function(error) {
    console.log("We are NOT authorized", error);
    window.location = "./login.html";
  });
}

function checkCookie(credential) {
  // Get cookie using our custom function
  return getCookie(credential);
}

function getCookie(credential) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  
  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(credential == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
      }
  }
  
  // Return null if not found
  return null;
}

function checkVersionOfWebApp() {
  console.log(version);
}

function writeFirebaseData(id) {
  var txt = document.getElementById("text"+id).value;
  firebase.database().ref('pages/texts/'+id).set({
    text: txt,
    ref: id
  });
}

function readFirebaseDataIntoEditor(id) {
  // once() method
  firebase.database().ref('pages/texts/'+id).on('value',(snap)=>{
    document.getElementById("text"+id).value = snap.val().text.charAt(0).toUpperCase() + snap.val().text.slice(1);
  });
}

function readFirebaseDataIntoLandingPage(id) {
  // once() method
  firebase.database().ref('pages/texts/'+id).on('value',(snap)=>{
    if ($("#text"+id+"sub").length > 0) {
      var splitted = snap.val().text.split("\n");
      if (splitted.length > 2) {
        $("#text"+id).text(splitted[0]);
        $("#text"+id+"sub").text(splitted[splitted.length - 1]);
      } else {
        $("#text"+id).text(splitted[0]);
        $("#text"+id+"sub").text(splitted[1]);
      }
    } else {
      $("#text"+id).text(snap.val().text);
    }
  });
}

function createFirebaseProduct() {
  // Synchronous
  var pCategory = $("#pCategory option:selected").val();
  var pName = $("#pName").val();
  var pPrice = $("#pPrice").val();
  // Asynchronous
  uploadImageToProductAndGetRefURL().then( function(resolved) {
    getDownloadURLForProductImage().then(function(urlResponse) {
      if (pCategory != "" && pName != "" && pPrice != "") {
        firebase.database().ref('products/'+pCategory).push({
          name: pName,
          price: pPrice,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          storageDataRefURL: urlResponse
        }).then( () => {
          location.reload();
        });
      }
    });
  });
}
// OLD
function readFirebaseProductsByCategory(category) {
  $("#selectedPlatform").text(category);
  $("#productContainer").html("");
  // once()
  firebase.database().ref('products/'+category).once('value').then(function (snap) {
    $.each(snap.val(), function(id, gameObj) {
      $("#productContainer").append('<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100 box-shadow-card"> <a href="#"><img class="card-img-top" src="'+gameObj.storageDataRefURL+'" alt=""></a><div class="card-body"><h4 class="card-title"><a href="#">'+gameObj.name+'</a></h4><h5><span class="badge badge-info">'+gameObj.price+',-</span></h5></div><div class="card-footer"> <span class="badge badge-secondary">'+category+'</span></div></div></div>');
    });
  });
   /* on() method
  firebase.database().ref('products/'+category).on('value',(snap)=>{
    $.each(snap.val(), function(id, gameObj) {
      $("#productContainer").append('<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100 box-shadow-card"> <a href="#"><img class="card-img-top" src="'+gameObj.storageDataRefURL+'" alt=""></a><div class="card-body"><h4 class="card-title"><a href="#">'+gameObj.name+'</a></h4><h5><span class="badge badge-info">'+gameObj.price+',-</span></h5></div><div class="card-footer"> <span class="badge badge-secondary">'+category+'</span></div></div></div>');
    });
  }); */
}
// NEW
function readFirebaseProductsByCategoryAlphabetically(category) {
  $("#selectedPlatform").text(category);
  $("#productContainer").html("");
  // once()
  firebase.database().ref('products/'+category).orderByChild('name').once('value').then(function (snap) {
    snap.forEach(function (child) {
      gameObj = child.val();
      $("#productContainer").append('<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100 box-shadow-card"> <a href="#"><img class="card-img-top" src="'+gameObj.storageDataRefURL+'" alt=""></a><div class="card-body"><h4 class="card-title"><a href="#">'+gameObj.name+'</a></h4><h5><span class="badge badge-info">'+gameObj.price+',-</span></h5></div><div class="card-footer"> <span class="badge badge-secondary">'+category+'</span></div></div></div>');

    });
  });
}

function updateFirebaseProduct() {
  var pCategory = $("#editProductCategory").val();
  var pID = $("#editProductID").val();
  var pName = $("#editProductName").val();
  var pPrice = $("#editProductPrice").val();
  firebase.database().ref('products/'+pCategory+'/'+pID).set({
    name: pName,
    price: pPrice,
    createdAt: firebase.database.ServerValue.TIMESTAMP
  }).then( () => {
    $("#spinners").toggleClass("spinners-hide");
  });
}

function deleteFirebaseProduct() {
  // SYNCHRONOUS
  var pID = $("#editProductID").val();
  var pCategory = $("#editProductCategory").val();
  var pImageURL = $("#editProductImageURL").val();
  // ASYNCHRONOUS
  var dataRef = firebase.storage().refFromURL(pImageURL);
  dataRef.delete().then(function () {
    
  });
  firebase.database().ref('products/'+pCategory+'/'+pID).remove().then( () => {
    location.reload();
  });
}



function readProductsIntoTable() {
  var tableHeaderScope = 1;
  // once() method
  firebase.database().ref('products').on('value',(snap)=>{
    // Each category object --> SNES, PS1 etc.
    $.each(snap.val(), function(categoryName, gamesInCategory) {
      // Each game object --> Chrono Trigger, Silent Hill etc.
      $.each(gamesInCategory, function(id, gameObj){
        $('#products tr:last').after('<tr data-toggle="modal" data-target="#editProductModal"> <th scope="row">'+tableHeaderScope+'</th> <td>'+gameObj.name+'</td> <td>'+categoryName+'</td> <td>'+id+'</td> <td>'+gameObj.price+'</td> <td> <img src="'+gameObj.storageDataRefURL+'"> </td> <td style="display: none">'+gameObj.storageDataRefURL+'</td> </tr>');
          tableHeaderScope++; 
      });
    });
    $("#spinners").toggleClass("spinners-hide");
  });
}

function readNewestProducts(category="PS1", amount=10) {
  $("#carouselExampleIndicators .carousel-inner").html("");
  var count = 1;
  firebase.database().ref("products/"+category).orderByChild("createdAt").limitToLast(amount).on('value', (snap)=> {
    $.each(snap.val(), function(id, gameObj) {
      var keyword = count == 1 ? "active" : "";
      $("#carouselExampleIndicators .carousel-inner").eq(0).append('<div class="carousel-item '+keyword+' new-product-element"><div> <img class="centered" src="'+gameObj.storageDataRefURL+'"><h3>'+gameObj.name+'</h3><h5>'+gameObj.price+',-</h5><p><span class="badge badge-pill badge-danger">Nyhed!</span></p></div></div>');
      count += 1;
    });
  });
}

function uploadImageToProductAndGetRefURL() {
  // SYNCHRONOUS PROGRESS BAR HANDLER
  var progressContainer = $("#progressContainer");
  // SYNCHRONOUS FILE UPLOAD HANDLER
  var progressBar = $("#uploadProgress");
  var fPath = $("#customFile").val();
  var f = $("#customFile").prop("files")[0];
  var fName = fPath.split('\\').pop();
  var storageRef = firebase.storage().ref('product_images/'+fName);
  // ASYNCHRONOUS
  return new Promise(function (resolve, reject) {
      var task = storageRef.put(f);
      task.on('state_changed', function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressBar.css('width', percentage+'%');
    },
  
    function error(err) {
    },
  
    function complete() {
      //code before the pause
      setTimeout(function(){
        progressBar.css('width', '0%');
        progressBar.css('background', 'green');
        resolve(true);
      }, 2000);
    });
  });
}

function getDownloadURLForProductImage(imageURL=null) {
  var fPath = $("#customFile").val();
  var fName = fPath.split('\\').pop();
  var dataRef = firebase.storage().ref('product_images/'+fName);
  return new Promise(function (resolve, reject) {
    dataRef.getDownloadURL().then(function(url) {
      resolve(url);
    });
  });
}
