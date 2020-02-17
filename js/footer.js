$(document).ready(function() {

    var d = new Date();
    var n = d.getFullYear();
    console.log(n);

    $("#footer-f span a").text('\u00A9 Vintage Games ' + n);

});