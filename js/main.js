$(document).ready(function() {
    $("#submit").on("click", function(e) {
        e.preventDefault();
        decode_url();
        $("#result-container").slideDown(200);
    })
})

function decode_url()
{
    var url = document.getElementById("url").value;
    var resultContainer = document.getElementById("result");
    resultContainer.innerHTML = null;
    
    if ( url.indexOf("?") >= 0 ) {
        var urlParts = url.split("?");
        var params = urlParts[1];
        var paramsList = params.split("&");
        
        paramsList.forEach(function(item) {
            var decodedItem = item.replace(/%20/g, ' ').replace(/%2F/g, '/');
            keyValue = decodedItem.split("=");
            if ( !keyValue[1] ) {
                keyValue[1] = '';
            }
            resultContainer.innerHTML += "<p>" + keyValue[0] + " => " + keyValue[1].replace(/%3D/g, '=') + "</p>";
        });
    } else {
        resultContainer.innerHTML += "<p><em>Invalid URL or no parameters passed.</em></p>"
    }
    
    return false;
}

function reload_page()
{
    document.getElementById("form").reset();
    window.location.reload();
}