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

    var params = null;

    if (url.indexOf("?") >= 0) {
        urlParts = url.split("?");
        if ( urlParts.length > 2 ) {
            resultContainer.innerHTML += "<p class='text-danger'><em>Invalid URL - too many query separators (?).</em></p>"
            return false;
        }
        var params = urlParts[1];
    } else {
        params = url;
    }

    var paramsList = params.split("&");

    paramsList.forEach(function(item) {
        var decodedItem = decode_url_param(item);
        keyValue = decodedItem.split("=");
        if ( !keyValue[1] ) {
            keyValue[1] = '';
        }
        resultContainer.innerHTML += "<p>" + keyValue[0] + " => " + keyValue[1].replace(/%3D/g, '=') + "</p>";
    });
    
    return false;
}

function decode_url_param(param)
{
    var decodeList = {
        "%20": " ",
        "%2F": "/",
        "%40": "@",
        "%3A": ":",
        "%5B": "[",
        "%5D": "]",
        "%2C": ",",
        "%7B": "{",
        "%7D": "}",
        "%22": "\"",
    };

    for (var k in decodeList){
        var expression = new RegExp(k, "g");
        param = param.replace(expression, decodeList[k]);
    }

    return param;
}

function reload_page()
{
    document.getElementById("form").reset();
    window.location.reload();
}