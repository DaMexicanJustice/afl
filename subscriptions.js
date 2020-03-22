function getUserSubs(oauth) {
    console.log("Getting subs");
    console.log("From function:" + oauth);
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.twitch.tv/helix/subscriptions?broadcaster_id=101846410",
      "method": "GET",
      "headers": {
        "Client-ID": "kokyco38mg96als9lyu4vu7hvlnge2",
        "Authorization": oauth,
        "Accept": "application/vnd.twitchtv.v5+json",
      }
    }
}
  
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

urlCodeParam = getUrlParameter('code');
console.log(urlCodeParam);

var interval = setInterval(function() {
    getUserSubs(urlCodeParam);
}, 5000);
  