// Native fetch method
// fetch('https://api.twitch.tv/helix/users/follows?to_id=101846410', {
//     method: 'GET',
//     hostname: [
//         'api',
//         'twitch',
//         'tv'
//       ],
//     path: [
//         'helix',
//         'users',
//         'follows'
//       ],
//     headers: {
//         'Client-ID': 'kokyco38mg96als9lyu4vu7hvlnge2',
//         'Accept': '*/*',
//         'Host': 'api.twitch.tv',
//     }
// }) // Call the fetch function passing the url of the API as a parameter
// .then(function(res) {
//     // Your code for handling the data you get from the API
//     console.log(res);
//     console.log(res.data);
//     document.getElementById('follower').innerHTML = 'FETCHING';
// })
// .catch(function(err) {
//     // This is where you run code if the server returns any errors
//     console.log(err);
// });


// jQuery method
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
      "Host": "api.twitch.tv",
      "Accept-Encoding": "gzip, deflate",
    //   "Connection": "keep-alive",
    //   "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });