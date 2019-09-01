fetch('https://api.twitch.tv/helix/users/follows?to_id=101846410', {
    headers: {
        'Client-ID': 'kokyco38mg96als9lyu4vu7hvlnge2'
    }
}) // Call the fetch function passing the url of the API as a parameter
.then(function(res) {
    // Your code for handling the data you get from the API
    console.log(res);
    document.getElementById('follower').innerHTML('...FETCHING...');
})
.catch(function(err) {
    // This is where you run code if the server returns any errors
    console.log(err);
});