let channelID = '101846410';
let channelName = 'aaron_';
let url = 'https://api.twitch.tv/kraken/channels/' + channelID + '/follows';

fetch(url, {
    method: 'GET',
    headers: new Headers({
        'Client-ID': '101846410'
    })
}) // Call the fetch function passing the url of the API as a parameter
.then(function(res) {
    // Your code for handling the data you get from the API
    console.log(res);
})
.catch(function(err) {
    // This is where you run code if the server returns any errors
    console.log(err);
});