let refreshInterval = 5000; //Refresh in milis. 5000 = 5 seconds.

// jQuery method
function getUsersFollows() {
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

function authenticate() {
  console.log("clicked");
  window.location.replace('https://id.twitch.tv/oauth2/authorize?client_id=kokyco38mg96als9lyu4vu7hvlnge2&redirect_uri=https://damexicanjustice.github.io/afl/subs.html&response_type=code&scope=user_subscriptions');
}

function getUserSubs() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.twitch.tv/helix/subscriptions?broadcaster_id=101846410",
    "method": "GET",
    "headers": {
      "Client-ID": "kokyco38mg96als9lyu4vu7hvlnge2",
      "Authorization": "hv1k1k90c8vufq6oaq1t1n5hnh7y91", // GET FROM AARON oauth
      "Accept": "application/vnd.twitchtv.v5+json",
    }
  }
}

var interval = setInterval(function() {
  getUsersFollows();
}, 5000);
