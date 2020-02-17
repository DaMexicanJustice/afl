$(document).ready(function() {
    document.getElementById('customFile').onchange = function () {
        $(".custom-file-label").html(this.value.replace(/.*[\/\\]/, ''));
    };
    
    $('#products').on("click", "tr", function() {
        var values = $(this).find('td').map(function() {
            return $(this).text();
        }).get();
        $("#editProductName").val(values[0]);
        $("#editProductDescription").val(values[1]);
        $("#editProductPrice").val(values[2]); 
    });
});