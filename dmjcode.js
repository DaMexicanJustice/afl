fetch("https://api.twitch.tv/helix/users/follows?from_id=_Aaron") // Call the fetch function passing the url of the API as a parameter
.then(function(res) {
    // Your code for handling the data you get from the API
    console.log(res);
})
.catch(function(err) {
    // This is where you run code if the server returns any errors
    console.log(err);
});