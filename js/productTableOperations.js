$(document).ready(function() {
    document.getElementById('customFile').onchange = function () {
        $(".custom-file-label").html(this.value.replace(/.*[\/\\]/, ''));
    };
    
    $('#products').on("click", "tr", function() {
        var values = $(this).find('td').map(function() {
            return $(this).text();
        }).get();
        $("#editProductName").val(values[0]);
        $("#editProductID").val(values[2]);
        $("#editProductPrice").val(values[3]); 
        // TO DO THIS
        $("#editProductCategory").val(values[1]);
    });
});

