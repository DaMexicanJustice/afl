let refreshInterval = 5000; //Refresh in milis. 5000 = 5 seconds.

function getUsersFollows() {
  console.log("Getting followers");
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.twitch.tv/helix/users/follows?to_id=101846410",
    "method": "GET",
    "headers": {
      "Client-ID": "kokyco38mg96als9lyu4vu7hvlnge2",
    //   "User-Agent": "PostmanRuntime/7.16.3",
      "Accept": "*/*",
    //   "Cache-Control": "no-cache",
    //   "Postman-Token": "7660d411-3de9-44b3-87ab-45389103d5a1,49878760-9137-41b9-b578-bfe7e9d28553",
    //   "Host": "api.twitch.tv",
    //   "Accept-Encoding": "gzip, deflate",
    //   "Connection": "keep-alive",
    //   "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response.data);
    $('#follower').html(response.data[0].from_name);
  });
}

var interval = setInterval(function() {
    getUsersFollows();
  }, 5000);